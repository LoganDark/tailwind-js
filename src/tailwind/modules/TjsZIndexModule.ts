import {Props}                               from '../../Props'
import {TjsUnitedClassname, TjsUnitedModule} from '../TjsUnitedModule'
import {TjsUpgradedConfig}                   from '../TjsUpgradedConfig'

export class TjsZIndexModule extends TjsUnitedModule {
	static zIndexRegex = /^[-+]?\d+|auto$/

	constructor(config: TjsUpgradedConfig) {
		super(config)

		this.types.add(
			/^z-index-/,
			(resolved: string, unitedClassname: TjsUnitedClassname) => {
				return new Props(unitedClassname.fullClassname)
					.withProp('z-index', resolved as number | 'auto')
			}
		)
	}

	protected resolveLength(unit: string): string | null {
		return TjsZIndexModule.zIndexRegex.test(unit) ? unit : null
	}
}