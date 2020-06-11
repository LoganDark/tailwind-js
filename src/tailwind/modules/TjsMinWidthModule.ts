import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsMinWidthModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'min-w-', 'min-width')
		this.loadSpacing(config.config.theme.minWidth)
	}

	clone(): this {
		return this.cloneDataInto(new TjsMinWidthModule(this.config) as this)
	}
}