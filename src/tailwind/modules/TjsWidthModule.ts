import {TjsSimpleLengthModule} from '../TjsSimpleLengthModule'
import {TjsUpgradedConfig}     from '../TjsUpgradedConfig'

export class TjsWidthModule extends TjsSimpleLengthModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'w-', 'width')
		this.loadSpacing(config.config.theme.width)
	}

	clone(): this {
		return this.cloneDataInto(new TjsWidthModule(this.config) as this)
	}
}