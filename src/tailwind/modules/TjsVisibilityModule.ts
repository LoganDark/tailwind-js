import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsBoxSizingDefs: TjsSimpleDefs = {
	'visible'  : {'visibility': 'visible'},
	'invisible': {'visibility': 'hidden'}
}

export class TjsVisibilityModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsBoxSizingDefs)
	}

	clone(): this {
		return this.cloneDataInto(new TjsVisibilityModule(this.config) as this)
	}
}