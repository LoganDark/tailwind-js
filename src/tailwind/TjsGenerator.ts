import {Generator}                                     from '../Generator'
import {defaultTjsConfig, RecursivePartial, TjsConfig} from './TjsConfig'
import {TjsCorePlugins}                                from './TjsCorePlugins'
import {TjsUpgradedConfig}                             from './TjsUpgradedConfig'

export class TjsGenerator extends Generator {
	config: TjsUpgradedConfig

	registerModules(config: TjsUpgradedConfig) {
		TjsCorePlugins.forEach((factory, key) => {
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

		const copy = {}

		const keys = Object.keys(obj) as any[]
		keys.push(...Object.getOwnPropertySymbols(obj))

		for (const key of keys) {
			const val = obj[key]
			copy[key] = typeof val === 'object' ? TjsGenerator.deepCopy(val) : val
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
	static deepMerge<T extends object>(base: T, patch: RecursivePartial<T>): T {
		for (const key in Object.keys(base)) {
			if (patch.hasOwnProperty(key)) {
				const val = patch[key]

				// noinspection JSDeprecatedSymbols
				if (typeof val === 'object' && !Array.isArray(val)) {
					this.deepMerge(base[key], val)
				} else {
					base[key] = val
				}
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
}