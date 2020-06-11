import {RegExpFinder}                       from './RegExpFinder'
import {TjsSpacing, TjsSpacingCallback}     from './TjsConfig'
import {TjsUnitedCallback, TjsUnitedModule} from './TjsUnitedModule'
import {TjsUpgradedConfig}                  from './TjsUpgradedConfig'
import escapeStringRegexp = require('escape-string-regexp')

export class TjsSpacingModule extends TjsUnitedModule {
	protected readonly spacingCallbacks: RegExpFinder<TjsSpacingCallback> = new RegExpFinder()

	constructor(config: TjsUpgradedConfig, types?: RegExpFinder<TjsUnitedCallback>) {
		super(config, types)
		this.loadSpacing(config.config.theme.spacing)
	}

	cloneDataInto<T extends this>(other: T) {
		super.cloneDataInto(other)
		other.spacingCallbacks.clear()
		other.spacingCallbacks.addAll(this.spacingCallbacks.entries)
		return other
	}

	clone(): this {
		return this.cloneDataInto(new TjsSpacingModule(this.config) as this)
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

	protected resolveLength(unit: string): string | null {
		const found = this.spacingCallbacks.match(unit)

		if (found === null) {
			return null
		}

		return found.t(unit)
	}
}