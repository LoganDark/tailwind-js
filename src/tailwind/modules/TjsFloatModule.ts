import {IProps}                         from '../../things'
import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsFloatDefs: TjsSimpleDefs = {
	'float-right': {'float': 'right'},
	'float-left' : {'float': 'left'},
	'float-none' : {'float': 'none'},
	'clearfix'   : {
		'content': '""',
		'display': 'table',
		'clear'  : 'both'
	}
}

export class TjsFloatModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsFloatDefs)
	}

	protected genProps(classname: string): IProps | null {
		const props = super.genProps(classname)

		if (classname === 'clearfix') {
			props.selectorSuffix = '::after'
		}

		return props
	}
}