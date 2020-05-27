import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsObjectPositionDefs: TjsSimpleDefs = {
	'object-bottom'      : {'object-position': 'bottom'},
	'object-center'      : {'object-position': 'center'},
	'object-left'        : {'object-position': 'left'},
	'object-left-bottom' : {'object-position': 'left bottom'},
	'object-left-top'    : {'object-position': 'left top'},
	'object-right'       : {'object-position': 'right'},
	'object-right-bottom': {'object-position': 'right bottom'},
	'object-right-top'   : {'object-position': 'right top'},
	'object-top'         : {'object-position': 'top'}
}

export class TjsObjectPositionModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsObjectPositionDefs)
	}

	clone(): this {
		return this.cloneDataInto(new TjsObjectPositionModule(this.config) as this)
	}
}