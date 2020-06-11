import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsMaxWidthModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'max-w-', 'max-width')
		this.loadSpacing(config.config.theme.maxWidth)
	}

	clone(): this {
		return this.cloneDataInto(new TjsMaxWidthModule(this.config) as this)
	}
}