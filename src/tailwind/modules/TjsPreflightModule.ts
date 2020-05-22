import {IGenerator, ILiteral, IModule} from '../../things'
import {TjsUpgradedConfig}             from '../TjsUpgradedConfig'
// @ts-ignore
import preflight                       from './preflight.css'

export class TjsPreflightModule implements IModule, ILiteral {
	config: TjsUpgradedConfig

	constructor(config: TjsUpgradedConfig) {
		this.config = config
	}

	// noinspection JSUnusedGlobalSymbols
	type: 'literal' = 'literal'
	text = preflight

	toCssText() {
		return this.text
	}

	clone(): this {
		return new TjsPreflightModule(this.config) as this
	}

	generator: IGenerator | null = null

	init(generator: IGenerator) {}

	inject(modules: IModule[]) {
		modules.unshift(this)
	}

	classLooksInteresting(classname: string) {
		return false
	}

	genClass(classname: string) {
		return false
	}
}