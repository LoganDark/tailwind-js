import {IProps, Properties} from './things'

/**
 * When a module generates a class, it can use Props to specify the CSS
 * properties to apply to the class.
 */
export class Props implements IProps {
	// noinspection JSUnusedGlobalSymbols
	type: 'props' = 'props'

	toCssText(): string {
		return `${this.selectorPrefix}.${this.classname}${this.selectorSuffix} {
\t${Object.keys(this.props).map(prop => prop + ': ' + this._props[prop] + ';').join('\n\t')}
}`
	}

	clone(): this {
		if (!(this instanceof Props)) {
			throw new TypeError('Override clone() since you are subclassing Props')
		}

		return new Props(this.classname)
			.withPrefix(this.selectorPrefix)
			.withSuffix(this.selectorSuffix)
			.withProps(this.props) as this
	}

	selectorPrefix: string = ''
	classname: string
	selectorSuffix: string = ''
	props: Properties = {}
	_props: {[prop: string]: string} = this.props as any

	constructor(classname: string) {
		this.classname = classname
	}

	/**
	 * Changes the {@link selectorPrefix} to the provided `prefix`, and then
	 * returns `this`.
	 */
	withPrefix(prefix: string) {
		this.selectorPrefix = prefix
		return this
	}

	/**
	 * Changes the {@link selectorSuffix} to the provided `suffix`, and then
	 * returns `this`.
	 */
	withSuffix(suffix: string) {
		this.selectorSuffix = suffix
		return this
	}

	/**
	 * Sets the specified CSS property to the specified value.
	 */
	set<T extends keyof Properties>(key: T, value: Properties[T]) {
		this.props[key] = value
	}

	/**
	 * Sets the specified CSS property to the specified value, and then returns
	 * `this`.
	 */
	withProp<T extends keyof Properties>(key: T, value: Properties[T]) {
		this.set(key, value)
		return this
	}

	/**
	 * Merges every property in the provided properties into {@link props}, then
	 * returns `this`.
	 */
	withProps(props: { [T in keyof Properties]: Properties[T] }) {
		for (const key of Object.keys(props)) {
			this.withProp(key as keyof Properties, props[key as keyof Properties])
		}

		return this
	}

	/**
	 * Merges every property in the provided Props' properties into
	 * {@link props}, then returns `this`.
	 */
	mergeIn(spec: this): this {
		for (const prop of Object.keys(spec.props)) {
			this._props[prop] = spec._props[prop]
		}

		return this
	}

	sameSelectorAs(other: IProps): boolean {
		// in order of most important to least important
		// almost as if I cared about performance! :D
		return other.classname == this.classname &&
		       other.selectorSuffix == this.selectorSuffix &&
		       other.selectorPrefix == this.selectorPrefix
	}
}