import {Group}                                                        from './Group'
import {IGenerator, IGroup, IModule, IPublicModule, isModule, IThing} from './things'

export class Generator extends Group implements IGenerator {
	clone(): this {
		throw new Generator()
	}

	shouldMergeWith(other: IGroup): boolean {
		return this == other
	}

	_modules: IModule[] = []
	modules: IPublicModule[] = this._modules

	// noinspection JSUnusedGlobalSymbols
	children: IThing[] = this.modules

	addChild(module: IThing) {
		if (!isModule(module)) {
			throw new TypeError('Can only add modules')
		}

		module.generator = this
		module.init(this)
		module.inject(this._modules)
		this.emit('childAdded', module)
		this.emit('cssChanged')
	}

	genCache: {[k: string]: boolean} = {}

	hasClass(classname: string): boolean {
		return this.genCache[classname] || false
	}

	genClass(classname: string): boolean {
		if (this.genCache.hasOwnProperty(classname)) {
			return this.genCache[classname]
		}

		let generated = false

		for (const module of this._modules) {
			if (module.classLooksInteresting(classname)) {
				generated = module.genClass(classname) || generated
			}
		}

		if (generated) {
			this.emit('cssChanged')
		}

		return this.genCache[classname] = generated
	}
}