import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsHeightModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'h-', 'height')
		this.loadSpacing(config.config.theme.height)
	}

	clone(): this {
		return this.cloneDataInto(new TjsHeightModule(this.config) as this)
	}
}