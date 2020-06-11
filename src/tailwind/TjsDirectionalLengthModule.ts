import {Props}              from '../Props'
import {SimpleGroup}        from '../SimpleGroup'
import {Properties}         from '../things'
import {TjsDynamicModule}   from './TjsDynamicModule'
import {TjsSpacingModule}   from './TjsSpacingModule'
import {TjsUnitedClassname} from './TjsUnitedModule'
import {TjsUpgradedConfig}  from './TjsUpgradedConfig'

export class TjsDirectionalLengthModule extends TjsSpacingModule {
	prefix: string
	cssProperty: keyof Properties

	sectionAll = new SimpleGroup()
	sectionAxes = new SimpleGroup()
	sectionSides = new SimpleGroup()

	constructor(config: TjsUpgradedConfig, prefix: string, cssProperty: keyof Properties) {
		super(config)

		this.prefix = prefix
		this.cssProperty = cssProperty

		this.addChild(this.sectionAll) // least specific
		this.addChild(this.sectionAxes) // kinda specific
		this.addChild(this.sectionSides) // most specific

		const leftProp = (cssProperty + '-left') as keyof Properties
		const rightProp = (cssProperty + '-right') as keyof Properties
		const topProp = (cssProperty + '-top') as keyof Properties
		const bottomProp = (cssProperty + '-bottom') as keyof Properties

		this.types.add(
			new RegExp('^' + prefix + '([xylrtb]?)-'),
			(resolved: string, unitedClassname: TjsUnitedClassname, match: RegExpMatchArray) => {
				const dir = match[1]
				const props = new Props(unitedClassname.fullClassname)

				if (dir.length === 0) {
					props.set(cssProperty, resolved)
					this.sectionAll.addChild(props)
				} else {
					const x = dir === 'x'
					const y = dir === 'y'

					if (x || dir === 'l') {
						props.set(leftProp, resolved)
					}

					if (x || dir === 'r') {
						props.set(rightProp, resolved)
					}

					if (y || dir === 't') {
						props.set(topProp, resolved)
					}

					if (y || dir === 'b') {
						props.set(bottomProp, resolved)
					}

					if (x || y) {
						this.sectionAxes.addChild(props)
					} else {
						this.sectionSides.addChild(props)
					}
				}

				return true
			}
		)
	}

	cloneDataInto<T extends this>(other: T) {
		// TjsDynamicModule
		this.cloneCacheInto(other as TjsDynamicModule)

		// TjsSpacingModule
		other.spacingCallbacks.clear()
		other.spacingCallbacks.addAll(this.spacingCallbacks.entries)

		this.sectionAll.cloneDataInto(other.sectionAll)
		this.sectionAxes.cloneDataInto(other.sectionAxes)
		this.sectionSides.cloneDataInto(other.sectionSides)

		return other
	}

	clone(): this {
		return this.cloneDataInto(
			new TjsDirectionalLengthModule(
				this.config,
				this.prefix,
				this.cssProperty
			) as this
		)
	}
}