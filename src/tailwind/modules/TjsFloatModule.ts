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

	clone(): this {
		return this.cloneDataInto(new TjsFloatModule(this.config) as this)
	}

	protected generate(classname: string): boolean {
		const props = super.genProps(classname)

		if (props === null) {
			return false
		}

		if (classname === 'clearfix') {
			props.selectorSuffix = '::after'
		}

		this.addChild(props)
		return true
	}
}