import {TjsDirectionalLengthModule} from '../TjsDirectionalLengthModule'
import {TjsUpgradedConfig}          from '../TjsUpgradedConfig'

export class TjsMarginModule extends TjsDirectionalLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'm', 'margin')
		this.loadSpacing(config.config.theme.margin)
	}

	clone(): this {
		return this.cloneDataInto(new TjsMarginModule(this.config) as this)
	}
}