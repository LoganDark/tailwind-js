import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsClearDefs: TjsSimpleDefs = {
	'clear-left' : {'clear': 'left'},
	'clear-right': {'clear': 'right'},
	'clear-both' : {'clear': 'both'},
	'clear-none' : {'clear': 'none'}
}

export class TjsClearModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsClearDefs)
	}

	clone(): this {
		return new TjsClearModule(this.config) as this
	}
}