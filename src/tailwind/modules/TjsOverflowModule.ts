import {Props}              from '../../Props'
import {IProps, Properties} from '../../things'
import {TjsDynamicModule}   from '../TjsDynamicModule'
import {TjsUpgradedConfig}  from '../TjsUpgradedConfig'

export class TjsOverflowModule extends TjsDynamicModule {
	constructor(config: TjsUpgradedConfig) {
		super(config, 'boxSizing')
	}

	clone(): this {
		return new TjsOverflowModule(this.config) as this
	}

	overflowRegex = /^(overflow(?:-[xy])?)-(auto|hidden|visible|scroll)$/
	scrollingRegex = /^scrolling-(touch|auto)$/

	classLooksInteresting(classname: string) {
		return this.overflowRegex.test(classname) ||
		       this.scrollingRegex.test(classname)
	}

	genProps(classname: string): IProps {
		const props = new Props(classname)

		{
			const scrollingMatch = this.scrollingRegex.exec(classname)

			if (scrollingMatch !== null) {
				return props.withProp('-webkit-overflow-scrolling' as keyof Properties, scrollingMatch[1])
			}

			const overflowMatch = this.overflowRegex.exec(classname)

			if (overflowMatch !== null) {
				return props.withProp(overflowMatch[1] as keyof Properties, overflowMatch[2])
			}
		}

		throw new TypeError('not interested in this class: ' + classname)
	}
}