import {Props}              from '../Props'
import {IGroup, Properties} from '../things'
import {TjsGroupModule}     from './TjsGroupModule'
import {TjsUpgradedConfig}  from './TjsUpgradedConfig'

/**
 * These definitions, well, define which classes that are going to be in your
 * module. The format is like this:
 *
 * ```
 * {
 *     'class-name': {
 *         'css-property': 'value',
 *         'another-css-property': 'another-value',
 *         'color': 'sans-serif'
 *     },
 *     'another-class-name': {
 *         'font-family': 'not-right'
 *     }
 * }
 * ```
 *
 * That will generate, only as they are requested, these classes:
 *
 * ```
 * .class-name {
 *     css-property: value;
 *     another-css-property: another-value;
 *     color: sans-serif;
 * }
 *
 * .another-class-name {
 *     font-family: not-right;
 * }
 * ```
 */
export type TjsSimpleDefs = {[classname: string]: Properties}

/**
 * When you have certain simple, unconfigurable modules like the box sizing
 * module (`box-border` and `box-content`, for example), there's no need to
 * define an entirely new subclass and you should usually be able to create
 * a new instance of some "simple" module that automatically keeps track of
 * those classes.
 */
export class TjsSimpleModule extends TjsGroupModule {
	defs: TjsSimpleDefs

	constructor(config: TjsUpgradedConfig, defs: TjsSimpleDefs) {
		super(config)
		this.defs = defs
	}

	clone(): this {
		return new TjsSimpleModule(this.config, this.defs) as this
	}

	shouldMergeWith(other: IGroup): boolean {
		return super.shouldMergeWith(other) &&
		       other instanceof TjsSimpleModule &&
		       other.defs == this.defs
	}

	classLooksInteresting(classname: string): boolean {
		return this.defs.hasOwnProperty(classname)
	}

	protected cache: {[classname: string]: boolean} = {}

	genClass(classname: string): boolean {
		if (this.cache.hasOwnProperty(classname)) {
			return this.cache[classname]
		}

		const props = new Props(classname)
		props.withProps(this.defs[classname])
		this.addChild(props)

		return this.cache[classname] = true
	}
}