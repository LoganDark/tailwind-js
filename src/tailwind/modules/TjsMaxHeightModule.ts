import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsMaxHeightModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'max-h-', 'max-height')
		this.loadSpacing(config.config.theme.maxHeight)
	}

	clone(): this {
		return this.cloneDataInto(new TjsMaxHeightModule(this.config) as this)
	}
}