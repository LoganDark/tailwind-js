import {MediaQueryGroup} from './MediaQueryGroup'

/**
 * LOL
 */
export class MinMaxMediaQueryGroup extends MediaQueryGroup {
	min: number | null
	max: number | null

	constructor(min: number | null, max: number | null) {
		super()

		this.min = min
		this.max = max

		Object.defineProperty(this, 'mediaQuery', {
			get() {
				if (this.min !== null && this.max !== null) {
					return `(min-width: ${this.min}px) and (max-width: ${this.max}px)`
				} else if (this.min !== null) {
					return `(min-width: ${this.min}px)`
				} else if (this.max !== null) {
					return `(max-width: ${this.max}px)`
				}

				throw new TypeError('invalid min/max state')
			},
			set(newValue: any) {
				if (typeof newValue !== 'string') {
					throw new TypeError('strings only buddy')
				}

				const minAndMaxRegex = /^\s*\(min-width: (\d+)px\)\s+and\s+\(max-width: (\d+)px\)\s*$/
				const minRegex = /^\s*\(min-width: (\d+)px\)\s*$/
				const maxRegex = /^\s*\(max-width: (\d+)px\)\s*$/

				if (minAndMaxRegex.test(newValue)) {
					const match = minAndMaxRegex.exec(newValue)
					this.min = +match[1]
					this.max = +match[2]
				} else if (minRegex.test(newValue)) {
					const match = minRegex.exec(newValue)
					this.min = +match[1]
				} else if (maxRegex.test(newValue)) {
					const match = maxRegex.exec(newValue)
					this.max = +match[1]
				} else {
					throw new TypeError('min/max query only buddy')
				}
			},
			enumerable: true
		})
	}
}