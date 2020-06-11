import {Props}              from '../Props'
import {Properties}         from '../things'
import {TjsSpacingModule}   from './TjsSpacingModule'
import {TjsUnitedClassname} from './TjsUnitedModule'
import {TjsUpgradedConfig}  from './TjsUpgradedConfig'
import escapeStringRegexp = require('escape-string-regexp')

export class TjsSimpleLengthModule extends TjsSpacingModule {
	prefix: string
	property: keyof Properties

	constructor(config: TjsUpgradedConfig, prefix: string, property: keyof Properties) {
		super(config)

		this.prefix = prefix
		this.property = property

		this.types.add(
			new RegExp('^' + escapeStringRegexp(prefix)),
			(resolved: string, unitedClassname: TjsUnitedClassname) => {
				this.addChild(
					new Props(unitedClassname.fullClassname)
						.withProp(this.property, resolved)
				)

				return true
			}
		)
	}

	clone(): this {
		return this.cloneDataInto(new TjsSimpleLengthModule(
			this.config,
			this.prefix,
			this.property
		) as this)
	}
}