import {Generator}                                     from '../Generator'
import {defaultTjsConfig, RecursivePartial, TjsConfig} from './TjsConfig'
import {tjsCorePlugins}                                from './TjsCorePlugins'
import {TjsUpgradedConfig}                             from './TjsUpgradedConfig'

export class TjsGenerator extends Generator {
	config: TjsUpgradedConfig

	registerModules(config: TjsUpgradedConfig) {
		tjsCorePlugins.forEach((factory, key) => {
			if (config.corePluginEnabled(key)) {
				this.addChild(factory(config))
			}
		})
	}

	/**
	 * Copies an object and all of its descendants without mutating the original
	 *
	 * @param obj The object to copy
	 * @returns A aopy of the object
	 */
	static deepCopy<T extends object>(obj: T): T {
		// noinspection JSDeprecatedSymbols
		if (Array.isArray(obj)) {
			return obj.map(this.deepCopy) as T
		}

		const copy = {} as T

		const keys = Object.keys(obj) as (keyof T)[]
		keys.push(...(Object.getOwnPropertySymbols(obj) as (keyof T)[]))

		for (const key of keys) {
			const val = obj[key]
			copy[key] = typeof val === 'object'
			            ? TjsGenerator.deepCopy(val as T[keyof T] & object)
			            : val
		}

		return copy as T
	}

	/**
	 * Mutates the original object base by applying patch on top of it
	 *
	 * @param base The object to mutate
	 * @param patch Patches to apply on top of it
	 * @returns `base`
	 */
	static deepMerge<T extends object, P extends RecursivePartial<T>>(base: T, patch: P): T {
		for (const key in Object.keys(patch)) {
			if (base.hasOwnProperty(key)) {
				const val = patch[key as keyof P]

				// noinspection JSDeprecatedSymbols
				if (typeof val === 'object' && !Array.isArray(val)) {
					this.deepMerge(base[key as keyof T] as T[keyof T] & object, val as any as RecursivePartial<T[keyof T] & object>)
				} else {
					base[key as keyof T] = val as any as T[keyof T]
				}
			} else {
				base[key as keyof T] = patch[key as keyof P] as any as T[keyof T]
			}
		}

		return base
	}

	constructor(config?: RecursivePartial<TjsConfig>) {
		super()

		this.config = new TjsUpgradedConfig(
			config === undefined
			? defaultTjsConfig
			: TjsGenerator.deepMerge(TjsGenerator.deepCopy(defaultTjsConfig), config)
		)

		this.registerModules(this.config)
	}

	clone(): this {
		const gen = new TjsGenerator(this.config.config)

		for (const module of this._modules) {
			gen.addChild(module.clone())
		}

		return gen as this
	}
}