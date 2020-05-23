import {EventEmitter}                                   from 'tsee'
import {IGroup, IGroupEvents, isGroup, isProps, IThing} from './things'

/**
 * This class is meant to make creating {@link IGroup}s easier, as well as
 * modules.
 */
export abstract class Group extends EventEmitter<IGroupEvents> implements IGroup {
	// noinspection JSUnusedGlobalSymbols
	type: 'group' = 'group'

	protected children: IThing[] = []

	abstract clone(): this

	extractClass(classname: string): IThing[] {
		const things: IThing[] = []

		for (const child of this.children) {
			if (isProps(child)) {
				if (child.classname === classname) {
					things.push(child)
				}
			} else if (isGroup(child)) {
				things.push(...child.extractClass(classname))
			}

			// do nothing with literals, they are not useful
		}

		return things
	}

	getChildren(): ReadonlyArray<IThing> {
		return this.children
	}

	addChild(child: IThing) {
		this.children.push(child)
		this.emit('childAdded', child)
		this.emit('cssChanged')
	}

	removeChild(child: IThing): boolean {
		const index = this.children.indexOf(child)

		if (index === -1) {
			return false
		}

		this.children.splice(index, 1)
		this.emit('childRemoved', child)
		this.emit('cssChanged')
		return true
	}

	hasClass(classname: string): boolean {
		for (const child of this.children) {
			if (isProps(child)) {
				if (child.classname === classname) {
					return true
				}
			} else if (isGroup(child)) {
				if (child.hasClass(classname)) {
					return true
				}
			}

			// do nothing with literals, they are not useful
		}

		return false
	}

	mergeIn(spec: IThing): IThing | null {
		if (isProps(spec)) {
			for (const equal of this.children) {
				if (isProps(equal) && equal.sameSelectorAs(spec)) {
					equal.mergeIn(spec)
					this.emit('mergedIn', spec, equal)
					this.emit('cssChanged')
					return equal
				}
			}
		} else if (isGroup(spec)) {
			for (const equal of this.children) {
				if (isGroup(equal) && equal.shouldMergeWith(spec)) {
					spec.beingMergedInto(equal)

					for (const childSpec of spec.getChildren()) {
						equal.mergeIn(childSpec)
					}

					this.emit('mergedIn', spec, equal)
					this.emit('cssChanged')
					return equal
				}
			}
		}

		// nothing special to do with literals

		const copy = spec.clone()
		this.children.push(copy)
		this.emit('mergedIn', spec, copy)
		this.emit('cssChanged')
		return copy
	}

	toCssText(): string {
		return this.children
			.map(thing => thing.toCssText())
			.filter(s => s.length > 0)
			.join('\n\n')
	}

	abstract shouldMergeWith(other: IGroup): boolean

	beingMergedInto(other: IGroup) {}
}