import {Props}             from '../../Props'
import {Properties}        from '../../things'
import {TjsDynamicModule}  from '../TjsDynamicModule'
import {TjsUpgradedConfig} from '../TjsUpgradedConfig'

export class TjsOverflowModule extends TjsDynamicModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'overflow')
	}

	clone(): this {
		return this.cloneDataInto(new TjsOverflowModule(this.config) as this)
	}

	overflowRegex = /^(overflow(?:-[xy])?)-(auto|hidden|visible|scroll)$/
	scrollingRegex = /^scrolling-(touch|auto)$/

	classLooksInteresting(classname: string) {
		return this.overflowRegex.test(classname) ||
		       this.scrollingRegex.test(classname)
	}

	protected generate(classname: string): boolean {
		const props = new Props(classname)

		{
			const scrollingMatch = this.scrollingRegex.exec(classname)

			if (scrollingMatch !== null) {
				props.set('-webkit-overflow-scrolling' as keyof Properties, scrollingMatch[1])
				this.addChild(props)
				return true
			}

			const overflowMatch = this.overflowRegex.exec(classname)

			if (overflowMatch !== null) {
				props.set(overflowMatch[1] as keyof Properties, overflowMatch[2])
				this.addChild(props)
				return true
			}
		}

		throw new TypeError('not interested in this class: ' + classname)
	}
}