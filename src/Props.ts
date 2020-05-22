import {IProps, Properties} from './things'

export class Props implements IProps {
	// noinspection JSUnusedGlobalSymbols
	type: 'props' = 'props'

	toCssText(): string {
		return `${this.selectorPrefix}.${this.classname}${this.selectorSuffix} {
\t${Object.keys(this.props).map(prop => prop + ': ' + this.props[prop] + ';').join('\n\t')}
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
	classname: string | null
	selectorSuffix: string = ''
	props: Properties = {}

	constructor(classname: string) {
		this.classname = classname
	}

	withPrefix(prefix: string) {
		this.selectorPrefix = prefix
		return this
	}

	withSuffix(suffix: string) {
		this.selectorSuffix = suffix
		return this
	}

	set<T extends keyof Properties>(key: T, value: Properties[T]) {
		this.props[key] = value
	}

	withProp<T extends keyof Properties>(key: T, value: Properties[T]) {
		this.set(key, value)
		return this
	}

	withProps(props: { [T in keyof Properties]: Properties[T] }) {
		for (const key of Object.keys(props)) {
			this.withProp(key as keyof Properties, props[key])
		}

		return this
	}

	mergeIn(spec: this): this {
		for (const prop of Object.keys(spec.props)) {
			this.props[prop] = spec.props[prop]
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