import {Props}                               from '../../Props'
import {TjsUnitedClassname, TjsUnitedModule} from '../TjsUnitedModule'
import {TjsUpgradedConfig}                   from '../TjsUpgradedConfig'

export class TjsZIndexModule extends TjsUnitedModule {
	static zIndexRegex = /^[-+]?\d+|auto$/

	constructor(config: TjsUpgradedConfig) {
		super(config)

		this.types.add(
			/^z-/,
			(resolved: string, unitedClassname: TjsUnitedClassname) => {
				this.addChild(
					new Props(unitedClassname.fullClassname)
						.withProp('z-index', resolved as number | 'auto')
				)

				return true
			}
		)
	}

	clone(): this {
		return this.cloneDataInto(new TjsZIndexModule(this.config) as this)
	}

	protected resolveLength(unit: string): string | null {
		return TjsZIndexModule.zIndexRegex.test(unit) ? unit : null
	}
}