import {IProps}                          from '../things'
import {RegExpFinder, RegExpFinderMatch} from './RegExpFinder'
import {TjsSpacing, TjsSpacingCallback}  from './TjsConfig'
import {TjsDynamicModule}                from './TjsDynamicModule'
import {TjsUpgradedConfig}               from './TjsUpgradedConfig'
import escapeStringRegexp = require('escape-string-regexp')

export interface TjsUnitedClassname {
	prefix: RegExpMatchArray | null
	classname: string,
	fullClassname: string
}

export type TjsUnitedCallback = (
	resolvedLength: string,
	unitedClassname: TjsUnitedClassname,
	match: RegExpMatchArray
) => IProps | null

export type TjsUnitedMatch = RegExpFinderMatch<TjsUnitedCallback>

export class TjsUnitedModule extends TjsDynamicModule {
	readonly types: RegExpFinder<TjsUnitedCallback>
	protected readonly spacingCallbacks: RegExpFinder<TjsSpacingCallback> = new RegExpFinder()

	constructor(config: TjsUpgradedConfig, types: RegExpFinder<TjsUnitedCallback> = new RegExpFinder()) {
		super(config)
		this.types = types
		this.loadSpacing(config.config.theme.spacing)
	}

	protected loadSpacing(spacing: TjsSpacing) {
		for (const key of Object.keys(spacing)) {
			const val = spacing[key]

			if (typeof val === 'string') {
				this.spacingCallbacks.add(
					new RegExp('^' + escapeStringRegexp(key) + '$'),
					() => val
				)
			} else {
				this.spacingCallbacks.add(
					new RegExp(key),
					val
				)
			}
		}
	}

	clone(): this {
		const module = new TjsUnitedModule(this.config, this.types.clone())
		module.spacingCallbacks.addAll(this.spacingCallbacks.entries)
		return module as this
	}

	private findRegex(classname: string) {
		return this.types.match(classname)
	}

	/**
	 * Anything matching this regex will be removed from the string and
	 * preserved as a prefix. This MUST only match from the start of the string
	 * and MUST never fail to match
	 */
	protected prefixRegex = /^-?/

	protected makeUnited(classname: string): TjsUnitedClassname {
		const match = this.prefixRegex.exec(classname)

		if (match === null) {
			throw new TypeError('prefix regex should never fail! classname: ' + classname)
		}

		return {
			prefix       : match,
			classname    : match !== null
			               ? classname.substr(match[0].length)
			               : classname,
			fullClassname: classname
		}
	}

	protected withoutPrefix(classname: string) {
		return this.makeUnited(classname).classname
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Returns the classname to use for finding a regex
	 */
	protected getMatchClassname(unitedClassname: TjsUnitedClassname): string {
		return unitedClassname.classname
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Given a united classname and a match run against it, return the length
	 * part of the class by itself (i.e. for 'py-5' and a match for 'py-',
	 * return '5')
	 */
	protected getTheLength(unitedClassname: TjsUnitedClassname, match: TjsUnitedMatch) {
		return unitedClassname.prefix + unitedClassname.classname.substr(match.match[0].length)
	}

	protected resolveLength(unit: string) {
		const found = this.spacingCallbacks.match(unit)

		if (found === null) {
			return null
		}

		return found.t(unit)
	}

	classLooksInteresting(classname: string): boolean {
		return this.findRegex(this.withoutPrefix(classname)) !== null
	}

	protected genProps(classname: string): IProps | null {
		const unitedClassname = this.makeUnited(classname)
		const match = this.findRegex(this.getMatchClassname(unitedClassname))

		if (match === null) {
			throw new TypeError('don\'t know what to do with this class: ' + unitedClassname.classname)
		}

		const length = this.getTheLength(unitedClassname, match)
		const resolved = this.resolveLength(length)

		if (resolved === null) {
			return null
		}

		return match.t(resolved, unitedClassname, match.match)
	}
}