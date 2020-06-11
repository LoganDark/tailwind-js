import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsMinHeightModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'min-h-', 'min-height')
		this.loadSpacing(config.config.theme.minHeight)
	}

	clone(): this {
		return this.cloneDataInto(new TjsMinHeightModule(this.config) as this)
	}
}