import {Props}                               from '../../Props'
import {Properties}                          from '../../things'
import {TjsUnitedClassname, TjsUnitedModule} from '../TjsUnitedModule'
import {TjsUpgradedConfig}                   from '../TjsUpgradedConfig'

export class TjsInsetModule extends TjsUnitedModule {
	constructor(config: TjsUpgradedConfig) {
		super(config)

		this.types.add(
			/^(top|bottom|left|right)-/,
			(resolved: string, unitedClassname: TjsUnitedClassname, match: RegExpMatchArray) => {
				return new Props(unitedClassname.fullClassname)
					.withProp(match[1] as keyof Properties, resolved)
			}
		)

		this.types.add(
			/^inset(?:-([xy]))?-/,
			(resolved: string, unitedClassname: TjsUnitedClassname, match: RegExpMatchArray) => {
				const xy = match[1]
				const props = new Props(unitedClassname.fullClassname)

				// catches cases where xy is x and also when xy is undefined
				if (xy !== 'y') {
					props.set('left', resolved)
					props.set('right', resolved)
				}

				// catches cases where xy is y and also when xy is undefined
				if (xy !== 'x') {
					props.set('top', resolved)
					props.set('bottom', resolved)
				}

				return props
			}
		)

		this.loadSpacing(config.config.theme.inset)
	}
}