import {TjsSimpleDefs, TjsSimpleModule} from '../TjsSimpleModule'
import {TjsUpgradedConfig}              from '../TjsUpgradedConfig'

export const tjsBoxSizingDefs: TjsSimpleDefs = {
	'box-border' : {'box-sizing': 'border-box'},
	'box-content': {'box-sizing': 'content-box'}
}

export class TjsBoxSizingModule extends TjsSimpleModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, tjsBoxSizingDefs)
	}

	clone(): this {
		return new TjsBoxSizingModule(this.config) as this
	}
}