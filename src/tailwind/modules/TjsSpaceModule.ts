import {Props}              from '../../Props'
import {TjsSpacingModule}   from '../TjsSpacingModule'
import {TjsUnitedClassname} from '../TjsUnitedModule'
import {TjsUpgradedConfig}  from '../TjsUpgradedConfig'

export class TjsSpaceModule extends TjsSpacingModule {
	spaceReverseRegex = /^space-[xy]-reverse$/

	constructor(config: TjsUpgradedConfig) {
		super(config)

		this.types.add(
			/^space-([xy])-/,
			(resolved: string, unitedClassname: TjsUnitedClassname, match: RegExpMatchArray) => {
				const x = match[1] === 'x'
				const spaceReverseString = 'space-' + match[1] + '-reverse'

				const props1 = new Props(unitedClassname.fullClassname)
				const props2 = new Props(unitedClassname.fullClassname)

				if (x) {
					props1.selectorSuffix = ':not(' + spaceReverseString + ') > * + *'
					props1.set(x ? 'margin-left' : 'margin-top', resolved)
					props2.selectorSuffix = '.' + spaceReverseString + ' > * + *'
					props2.set(x ? 'margin-right' : 'margin-bottom', resolved)
				}

				this.addChild(props1)
				this.addChild(props2)

				return true
			}
		)

		this.loadSpacing(config.config.theme.space)
	}

	clone(): this {
		return this.cloneDataInto(new TjsSpaceModule(this.config) as this)
	}

	classLooksInteresting(classname: string) {
		return !this.spaceReverseRegex.test(classname) &&
		       super.classLooksInteresting(classname)
	}

	protected generate(classname: string): boolean {
		return !this.spaceReverseRegex.test(classname) &&
		       super.generate(classname)
	}
}