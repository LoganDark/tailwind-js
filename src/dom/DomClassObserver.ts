import {EventEmitter} from 'tsee'
import {IGenerator}   from '../things'

export type DomClassObserverEvents = {
	classDiscovered: (classname: string) => void
}

/**
 * The DOM class observer observes all nodes under a given root node and offers
 * up any class names it encounters. This can be used to generate a stylesheet
 * from a live DOM in the browser, when combined with
 * {@link DomStyleMaintainer}.
 */
export class DomClassObserver extends EventEmitter<DomClassObserverEvents> {
	private observer: MutationObserver = new MutationObserver(this.onMutation.bind(this))
	attached = false

	/**
	 * Starts observing the given node and all its descendants for any class
	 * changes. It also immediately scans every node currently in the tree for
	 * new classes
	 */
	attach(node: Node) {
		if (this.attached) {
			this.detach()
		}

		this.observer.observe(node, {
			attributeFilter: ['class'],
			childList      : true,
			subtree        : true
		})

		this.attached = true

		this.scan(node)
	}

	/**
	 * Scans the provided node and all its children for classes, encountering
	 * every single one and making sure that they are all discovered
	 */
	scan(node: Node) {
		if (node instanceof Element) {
			this.processClassList(node.classList)
		}

		node.childNodes.forEach(child => {
			this.scan(child)
		})
	}

	/**
	 * Stops observing class changes
	 */
	detach() {
		if (this.attached) {
			this.observer.disconnect()
			this.attached = false
		} else {
			throw new TypeError('Not currently attached')
		}
	}

	private onMutation(mutations: MutationRecord[]) {
		for (const mutation of mutations) {
			this.processMutation(mutation)
		}
	}

	private _discovered: string[] = []

	/**
	 * An array of all the class names this observer has encountered
	 *
	 * Use {@link reset} to reset this
	 */
	discovered: ReadonlyArray<string> = this._discovered

	private discoveredLookup: {[classname: string]: true} = {}

	/**
	 * Returns true if classname has been seen by this observer before
	 */
	hasDiscovered(classname: string) {
		return this.discoveredLookup.hasOwnProperty(classname)
	}

	protected discover(classname: string) {
		this._discovered.push(classname)
		this.discoveredLookup[classname] = true
		this.emit('classDiscovered', classname)
	}

	/**
	 * Encounters a new class. Discovers it if it hasn't been discovered yet
	 */
	encounter(classname: string) {
		if (!this.hasDiscovered(classname)) {
			this.discover(classname)
		}
	}

	/**
	 * Forgets a class ever existed (cannot undo anything you did in your
	 * listeners, though)
	 */
	forget(classname: string) {
		if (this.hasDiscovered(classname)) {
			this._discovered.splice(this._discovered.indexOf(classname), 1)
			delete this.discovered[classname]
		}
	}

	private processClassList(classList: DOMTokenList) {
		classList.forEach(this.encounter.bind(this))
	}

	private processNode(node: Node) {
		if (node instanceof Element) {
			this.processClassList(node.classList)
		}
	}

	private processMutation(mutation: MutationRecord) {
		if (mutation.type === 'attributes') {
			if (mutation.attributeName !== 'class') {
				throw new TypeError('Invalid mutation record encountered (not for attribute `class`): ' + mutation.toString())
			}

			this.processNode(mutation.target)
		} else if (mutation.type === 'childList') {
			mutation.addedNodes.forEach(this.processNode.bind(this))
		} else {
			throw new TypeError('Invalid mutation record encountered (not type `attributes` or `childList`): ' + mutation.toString())
		}
	}

	/**
	 * Automatically pipes any newly discovered classes into the provided
	 * generator, and returns the listener function that was bound (so you can
	 * unbind it if needed)
	 */
	pipe(generator: IGenerator) {
		const listener = generator.genClass.bind(generator)
		this.on('classDiscovered', listener)
		return listener
	}

	/**
	 * Detaches the observer, forgets all classes, and removes all listeners
	 */
	reset() {
		if (this.attached) {
			this.detach()
		}

		this.discovered = this._discovered = []
		this.discoveredLookup = {}
		this.removeAllListeners()
	}
}