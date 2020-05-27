import {Group}               from './Group'
import {IGenerator, IModule} from './things'

export abstract class GroupModule extends Group implements IModule {
	// noinspection JSUnusedGlobalSymbols
	generator: IGenerator | null = null

	abstract clone(): this

	init(generator: IGenerator) {}

	inject(modules: IModule[]) {
		modules.push(this)
	}

	abstract classLooksInteresting(classname: string): boolean

	abstract genClass(classname: string): boolean
}
