import {Props}              from '../../Props'
import {Properties}         from '../../things'
import {TjsSpacingModule}   from '../TjsSpacingModule'
import {TjsUnitedClassname} from '../TjsUnitedModule'
import {TjsUpgradedConfig}  from '../TjsUpgradedConfig'

export class TjsInsetModule extends TjsSpacingModule {
	constructor(config: TjsUpgradedConfig) {
		super(config)

		this.types.add(
			/^(top|bottom|left|right)-/,
			(resolved: string, unitedClassname: TjsUnitedClassname, match: RegExpMatchArray) => {
				this.addChild(
					new Props(unitedClassname.fullClassname)
						.withProp(match[1] as keyof Properties, resolved)
				)

				return true
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

				this.addChild(props)

				return true
			}
		)

		this.loadSpacing(config.config.theme.inset)
	}

	clone(): this {
		return this.cloneDataInto(new TjsInsetModule(this.config) as this)
	}
}