import {PropertiesHyphen} from 'csstype'
import {EventEmitter}     from 'tsee'

interface IBaseThing {
	/**
	 * The type of thing this is. Don't just implement this randomly, inherit
	 * from the correct interface or things will break
	 */
	type: 'props' | 'group' | 'literal'

	/**
	 * Returns a string containing this thing as CSS text
	 *
	 * No trailing newline please
	 */
	toCssText(): string

	/**
	 * Create a new instance of this group with the exact same properties as the
	 * existing one. They should act exactly the same
	 */
	clone(): this
}

export type Properties = PropertiesHyphen

/**
 * Represents some props
 */
export interface IProps extends IBaseThing {
	type: 'props'

	/**
	 * The CSS selector prefix
	 */
	selectorPrefix: string

	/**
	 * The classname this concerns
	 */
	classname: string

	/**
	 * The CSS selector suffix (`:hover`, etc)
	 */
	selectorSuffix: string

	/**
	 * The properties to apply
	 */
	props: Properties

	/**
	 * Merges the specified props into these props. Returns this.
	 */
	mergeIn(spec: this): this

	/**
	 * Returns `true` if the other {@link IProps} has an identical selector.
	 */
	sameSelectorAs(other: IProps): boolean
}

export type IGroupEvents = {
	/**
	 * Emitted after a child is added directly under this group
	 * {@link cssChanged} is always emitted right after
	 * @param child The child that was added
	 */
	childAdded: (child: IThing) => void,
	/**
	 * Emitted after a child is removed from directly under this group
	 * {@link cssChanged} is always emitted right after
	 * @param child The child that was removed
	 */
	childRemoved: (child: IThing) => void,
	/**
	 * Emitted after a child is merged into this group's children
	 * {@link cssChanged} is always emitted right after
	 * @param spec The child that was merged in
	 * @param mergedInto The child that it was merged into, after merging
	 */
	mergedIn: (spec: IThing, mergedInto: IThing) => void,
	/**
	 * Emitted whenever the CSS text changes
	 *
	 * Fired after any other event
	 */
	cssChanged: () => void
}

/**
 * Represents a group of props
 */
export interface IGroup extends IBaseThing, EventEmitter<IGroupEvents> {
	type: 'group'

	getChildren(): ReadonlyArray<IThing>

	/**
	 * Adds a child to the group's children
	 */
	addChild(child: IThing): void

	/**
	 * Removes a child from the group's children. Returns true if the child was
	 * removed
	 */
	removeChild(child: IThing): boolean

	/**
	 * Merges the specified thing into this thing. Returns the other side that
	 * it was merged with.
	 */
	mergeIn(spec: IThing): IThing | null

	/**
	 * Returns true if this group or any of its subgroups has props for the
	 * specified classname
	 */
	hasClass(classname: string): boolean

	/**
	 * Extracts a copy of this group containing ONLY the specified class, and
	 * copies of any other groups that also contain the class
	 */
	extractClass(classname: string): IThing[]

	/**
	 * Used in merging behavior. Return true if `other` should be merged into
	 * this (all its children added via {@link mergeIn} calls)
	 */
	shouldMergeWith(other: IGroup): boolean

	/**
	 * Called when your group is being merged into another. Any caches, etc.
	 * should be added to the other group.
	 */
	beingMergedInto(other: IGroup): void
}

/**
 * A literal is just a thing containing CSS text.
 *
 * DO NOT USE THIS FOR STORING CLASS STYLES! However, some things like the
 * preflight need this since they contain CSS that has nothing to do with a
 * specific tailwind class.
 */
export interface ILiteral extends IBaseThing {
	type: 'literal'
	text: string
}

export interface IPublicModule extends IBaseThing {
	/**
	 * A reference back to the generator this module is a part of
	 */
	readonly generator: IGenerator | null
}

/**
 * A module is like a group
 */
export interface IModule extends IPublicModule {
	/**
	 * A reference back to the generator this module is a part of
	 */
	generator: IGenerator | null

	/**
	 * Called right before {@link inject}
	 */
	init(generator: IGenerator): void

	/**
	 * Insert yourself into the generator's modules array. If in doubt, just
	 * append `this` to the end, but if you have specific requirements, fulfill
	 * them here
	 */
	inject(modules: IModule[]): void

	/**
	 * Returns true if the classname looks nice
	 *
	 * {@link genClass} will only be called for this classname if this method
	 * returns true
	 *
	 * This method returning true does not *guarantee* that a class will be
	 * generated, but generally you should try to be as accurate as possible.
	 * It is still just a filter and is meant to be fast, though
	 */
	classLooksInteresting(classname: string): boolean

	/**
	 * Adds this classname to whatever is returned by {@link toCssText}.
	 *
	 * Returns true if the class was generated
	 *
	 * This should only ever be called once for any given class
	 */
	genClass(classname: string): boolean
}

export interface IGenerator extends IGroup {
	modules: IPublicModule[]

	/**
	 * Returns true if classname has been encountered & generated before
	 */
	hasClass(classname: string): boolean

	/**
	 * Generates a class if possible, and returns true if it is now present
	 */
	genClass(classname: string): boolean
}

/**
 * Represents a thing
 */
export type IThing = IProps | IGroup | ILiteral | IPublicModule

/**
 * @returns `true` if `thing` is an {@link IProps}
 */
export function isProps(thing: IThing): thing is IProps {
	return thing.type === 'props'
}

/**
 * @returns `true` if `thing` is an {@link IGroup}
 */
export function isGroup(thing: IThing): thing is IGroup {
	return thing.type === 'group'
}

/**
 * @returns `true` if `thing` is an {@link ILiteral}
 */
export function isLiteral(thing: IThing): thing is ILiteral {
	return thing.type === 'literal'
}

/**
 * @returns `true` if `thing` is an {@link IModule}
 */
export function isModule(thing: IThing): thing is IModule {
	const module = thing as unknown as IModule

	return module.hasOwnProperty('generator') &&
	       (module.generator === null || isGroup(module.generator)) &&
	       typeof module.inject === 'function' &&
	       typeof module.classLooksInteresting === 'function' &&
	       typeof module.genClass === 'function'
}