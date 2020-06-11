import {TjsDirectionalLengthModule} from '../TjsDirectionalLengthModule'
import {TjsUpgradedConfig}          from '../TjsUpgradedConfig'

export class TjsPaddingModule extends TjsDirectionalLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'p', 'padding')
		this.loadSpacing(config.config.theme.padding)
	}

	clone(): this {
		return this.cloneDataInto(new TjsPaddingModule(this.config) as this)
	}

	protected resolveLength(unit: string): string | null {
		const resolved = super.resolveLength(unit)

		// padding does not support negatives
		if (resolved !== null && resolved.startsWith('-')) {
			return null
		}

		return resolved
	}
}