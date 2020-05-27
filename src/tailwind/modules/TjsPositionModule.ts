import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsPositionDefs: TjsSimpleDefs = {
	'static'  : {'position': 'static'},
	'fixed'   : {'position': 'fixed'},
	'absolute': {'position': 'absolute'},
	'relative': {'position': 'relative'},
	'sticky'  : {'position': 'sticky'}
}

export class TjsPositionModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsPositionDefs)
	}

	clone(): this {
		return this.cloneDataInto(new TjsPositionModule(this.config) as this)
	}
}