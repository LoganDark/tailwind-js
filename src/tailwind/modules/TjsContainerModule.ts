import {Props}             from '../../Props'
import {IGroup}            from '../../things'
import {TjsGroupModule}    from '../TjsGroupModule'
import {TjsUpgradedConfig} from '../TjsUpgradedConfig'

// @ts-ignore

export class TjsContainerModule extends TjsGroupModule {
	constructor(config: TjsUpgradedConfig) {
		super(config)
	}

	clone(): this {
		return this.cloneDataInto(new TjsContainerModule(this.config) as this)
	}

	shouldMergeWith(other: IGroup): boolean {
		return super.shouldMergeWith(other) && other instanceof TjsContainerModule
	}

	beingMergedInto(other: IGroup) {
		if (!(other instanceof TjsContainerModule)) {
			throw new TypeError('merging with invalid group')
		}

		other.generated = other.generated || this.generated
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

		const config = this.config.config.theme.container
		const baseProps = new Props(classname)

		baseProps.set('width', '100%')

		if (config.center) {
			baseProps.set('margin-left', 'auto')
			baseProps.set('margin-right', 'auto')
		}

		if (typeof config.padding === 'string' && config.padding.length > 0) {
			baseProps.set('padding-left', config.padding)
			baseProps.set('padding-right', config.padding)
		}

		this.addChild(baseProps)

		const medias = this.config.getScreenGroupsFlat()
		const minWidthRegex = /\(min-width: ([^)]+)\)/

		for (const media of medias) {
			const match = minWidthRegex.exec(media.mediaQuery)

			if (match !== null) {
				const props = new Props(classname)
				props.set('max-width', match[1])

				let padding = typeof config.padding !== 'string' && config.padding[media.name] || ''

				if (padding.length > 0) {
					props.set('padding-left', padding)
					props.set('padding-right', padding)
				}

				media.comment = media.name
				media.addChild(props)
				this.addChild(media)
			}
		}

		return this.generated = true
	}
}