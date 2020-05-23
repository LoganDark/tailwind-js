import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsDisplayDefs: TjsSimpleDefs = {
	'hidden'            : {'display': 'none'},
	'block'             : {'display': 'block'},
	'flow-root'         : {'display': 'flow-root'},
	'inline-block'      : {'display': 'inline-block'},
	'inline'            : {'display': 'inline'},
	'flex'              : {'display': 'flex'},
	'inline-flex'       : {'display': 'inline-flex'},
	'grid'              : {'display': 'grid'},
	'inline-grid'       : {'display': 'inline-grid'},
	'table'             : {'display': 'table'},
	'table-caption'     : {'display': 'table-caption'},
	'table-cell'        : {'display': 'table-cell'},
	'table-column'      : {'display': 'table-column'},
	'table-column-group': {'display': 'table-column-group'},
	'table-footer-group': {'display': 'table-footer-group'},
	'table-header-group': {'display': 'table-header-group'},
	'table-row-group'   : {'display': 'table-row-group'},
	'table-row'         : {'display': 'table-row'}
}

export class TjsDisplayModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsDisplayDefs)
	}
}