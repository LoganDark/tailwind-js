import {MediaQueryGroup}                     from '../MediaQueryGroup'
import {TjsScreenBreakpoint, TjsScreenRange} from './TjsConfig'

export class TjsScreenRangeGroup extends MediaQueryGroup {
	static mediaQueryFor(range: TjsScreenRange) {
		if (typeof range === 'string') {
			return `(min-width: ${range})`
		} else {
			if (typeof range !== 'object') {
				throw new TypeError('Invalid TjsScreenRange')
			}

			if (range.hasOwnProperty('raw')) {
				const raw = range['raw']

				if (typeof raw !== 'string') {
					throw new TypeError('Invalid TjsScreenRange')
				}

				return raw
			} else {
				const hasMin = range.hasOwnProperty('min')
				const hasMax = range.hasOwnProperty('max')

				if (!hasMin && !hasMax) {
					throw new TypeError('Invalid TjsScreenRange')
				}

				if (hasMin && hasMax) {
					return `(min-width: ${range['min']}) and (max-width: ${range['max']})`
				} else {
					if (hasMin) {
						return `(min-width: ${range['min']})`
					} else {
						return `(max-width: ${range['max']})`
					}
				}
			}
		}
	}

	range: TjsScreenRange
	name: string | null

	constructor(range: TjsScreenRange, name: string | null = null) {
		super(TjsScreenRangeGroup.mediaQueryFor(range))
		this.range = range
		this.name = name
	}

	clone(): this {
		return new TjsScreenRangeGroup(this.range, this.name) as this
	}

	static groupsForBreakpoint(breakpoint: TjsScreenBreakpoint, name: string | null = null): TjsScreenRangeGroup[] {
		// noinspection JSDeprecatedSymbols
		if (!Array.isArray(breakpoint)) {
			return this.groupsForBreakpoint([breakpoint], name)
		}

		return breakpoint.map(range => new TjsScreenRangeGroup(range, name))
	}
}