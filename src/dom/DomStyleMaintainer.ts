import {IGenerator} from '../things'

/**
 * This class's purpose is to own a `<style>` element, and update that element
 * as new classes are discovered and added to the provided generator. Every time
 * the generator's CSS changes, the style element will be updated, hopefully
 * keeping the CSS up to date with whatever's going on with that generator.
 */
export class DomStyleMaintainer {
	readonly generator: IGenerator
	private element: HTMLStyleElement = document.createElement('style')
	private listener = this.update.bind(this)

	/**
	 * Returns the style element that this maintainer owns. It will never change
	 * elements; it owns one and exactly one throughout its whole lifetime
	 */
	getElement() {
		return this.element
	}

	constructor(generator: IGenerator) {
		this.generator = generator
		this.element.setAttribute('type', 'text/css')
		this.start()
	}

	/**
	 * Starts observing the generator for changes to its CSS, and updating this
	 * maintainer's element accordingly. This is done by default on construction
	 */
	start() {
		this.update()
		this.generator.on('cssChanged', this.listener)
	}

	/**
	 * Updates the maintainer manually, setting the style element's text to the
	 * generator's CSS text. If you ever have to call this manually, it's a bug,
	 * and should be reported as such. Generators should not be able to change
	 * without calling {@link cssChanged}
	 */
	update() {
		this.element.innerHTML = this.generator.toCssText()
	}

	/**
	 * Stops observing the generator. while the maintainer is stopped, the style
	 * element will only be updated if you call {@link update} manually
	 */
	stop() {
		this.generator.off('cssChanged', this.listener)
	}
}