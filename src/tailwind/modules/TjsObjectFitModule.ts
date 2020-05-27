import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsObjectFitDefs: TjsSimpleDefs = {
	'object-contain'   : {'object-fit': 'contain'},
	'object-cover'     : {'object-fit': 'cover'},
	'object-fill'      : {'object-fit': 'fill'},
	'object-none'      : {'object-fit': 'none'},
	'object-scale-down': {'object-fit': 'scale-down'}
}

export class TjsObjectFitModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsObjectFitDefs)
	}

	clone(): this {
		return this.cloneDataInto(new TjsObjectFitModule(this.config) as this)
	}
}