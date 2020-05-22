import {GroupModule}       from '../../GroupModule'
import {Props}             from '../../Props'
import {IGroup}            from '../../things'
import {TjsUpgradedConfig} from '../TjsUpgradedConfig'

// @ts-ignore

export class TjsContainerModule extends GroupModule {
	config: TjsUpgradedConfig

	constructor(config: TjsUpgradedConfig) {
		super()
		this.config = config
	}

	clone(): this {
		return new TjsContainerModule(this.config) as this
	}

	shouldMergeWith(other: IGroup): boolean {
		return other instanceof TjsContainerModule
	}

	classLooksInteresting(classname: string) {
		return classname === 'container' && !this.hasClass(classname)
	}

	generated = false

	genClass(classname: string) {
		if (classname !== 'container') {
			throw new TypeError('wat? not container, but genClass was called')
		} else if (this.generated) {
			return true
		}

		const medias = this.config.getScreenGroupsFlat()
		const minWidthRegex = /\(min-width: ([^)]+)\)/

		for (const media of medias) {
			const match = minWidthRegex.exec(media.mediaQuery)

			if (match !== null) {
				const props = new Props(classname)
				props.set('max-width', match[1])
				media.comment = media.name
				media.addChild(props)
				this.addChild(media)
			}
		}

		return this.generated = true
	}
}