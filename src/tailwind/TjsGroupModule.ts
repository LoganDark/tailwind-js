import {GroupModule}       from '../GroupModule'
import {IGroup}            from '../things'
import {TjsUpgradedConfig} from './TjsUpgradedConfig'

// @ts-ignore

/**
 * Meant to be extended. Makes it slightly less tedious to define modules that
 * accept an {@link TjsUpgradedConfig}
 */
export abstract class TjsGroupModule extends GroupModule {
	config: TjsUpgradedConfig

	protected constructor(config: TjsUpgradedConfig) {
		super()
		this.config = config
	}

	abstract clone(): this

	shouldMergeWith(other: IGroup): boolean {
		return other instanceof TjsGroupModule && other.config == this.config
	}

	abstract classLooksInteresting(classname: string): boolean

	abstract genClass(classname: string): boolean
}