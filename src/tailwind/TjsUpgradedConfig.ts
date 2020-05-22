import {TjsConfig, TjsCorePlugin} from './TjsConfig'
import {TjsScreenRangeGroup}      from './TjsScreenRangeGroup'

export class TjsUpgradedConfig {
	config: TjsConfig

	constructor(config: TjsConfig) {
		this.config = config
	}

	corePluginEnabled(corePlugin: TjsCorePlugin) {
		return this.config.corePlugins[corePlugin]
	}

	getScreenGroups() {
		const groups: {[breakpoint: string]: TjsScreenRangeGroup[]} = {}
		const screens = this.config.theme.screens

		for (const key of Object.keys(screens)) {
			groups[key] = TjsScreenRangeGroup.groupsForBreakpoint(screens[key], key)
		}

		return groups
	}

	getScreenGroupsFlat() {
		const groups: TjsScreenRangeGroup[] = []
		const screens = this.config.theme.screens

		for (const key of Object.keys(screens)) {
			groups.push(...TjsScreenRangeGroup.groupsForBreakpoint(screens[key], key))
		}

		return groups
	}
}