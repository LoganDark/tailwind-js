import {IGroup, IProps}    from '../things'
import {TjsGroupModule}    from './TjsGroupModule'
import {TjsUpgradedConfig} from './TjsUpgradedConfig'

/**
 * Automatically keeps a cache of generated classes, and allows you to focus on
 * generating your classes when needed.
 *
 * Usage: Implement {@link clone}, {@link classLooksInteresting}, and
 * {@link genProps} and you should be set.
 *
 * Try to make sure {@link name} is unique, or else just don't define it and
 * instead redefine {@link shouldMergeWith} (with a call to super of course)
 */
export abstract class TjsDynamicModule extends TjsGroupModule {
	name?: string

	protected constructor(config: TjsUpgradedConfig, name?: string) {
		super(config)
		this.name = name
	}

	protected cloneCacheInto(other: TjsDynamicModule) {
		// make sure the other module knows not to re-generate our classes
		for (const classname in Object.keys(this.cache)) {
			if (!other.cache.hasOwnProperty(classname)) {
				other.cache[classname] = this.cache[classname]
			}
		}
	}

	protected cloneDataInto<T extends this>(other: T) {
		super.cloneDataInto(other)
		this.cloneCacheInto(other)
		return other
	}

	abstract clone(): this

	shouldMergeWith(other: IGroup): boolean {
		return super.shouldMergeWith(other) &&
		       other instanceof TjsDynamicModule &&
		       other.name === this.name
	}

	beingMergedInto(other: IGroup) {
		if (!(other instanceof TjsDynamicModule)) {
			throw new TypeError('merging with invalid group?')
		}

		// our classes are going to be merged in, so make sure the other module
		// knows not to re-generate them
		this.cloneCacheInto(other)
	}

	abstract classLooksInteresting(classname: string): boolean

	protected cache: {[classname: string]: boolean} = {}

	protected abstract genProps(classname: string): IProps | null

	genClass(classname: string): boolean {
		if (this.cache.hasOwnProperty(classname)) {
			return this.cache[classname]
		}

		const props = this.genProps(classname)

		if (props !== null) {
			this.addChild(props)
		}

		return this.cache[classname] = props !== null
	}
}