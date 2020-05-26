import {MediaQueryGroup}                                                                                          from '../MediaQueryGroup'
import {TjsScreenBreakpoint, TjsScreenRange, TjsScreenRangeWithMax, TjsScreenRangeWithMin, TjsScreenRangeWithRaw} from './TjsConfig'

export class TjsScreenRangeGroup extends MediaQueryGroup {
	static mediaQueryFor(range: TjsScreenRange) {
		if (typeof range === 'string') {
			return `(min-width: ${range})`
		} else {
			if (typeof range !== 'object') {
				throw new TypeError('Invalid TjsScreenRange')
			}

			if (range.hasOwnProperty('raw')) {
				const raw = (range as TjsScreenRangeWithRaw).raw

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
					return `(min-width: ${(range as TjsScreenRangeWithMin)['min']}) and (max-width: ${(range as TjsScreenRangeWithMax)['max']})`
				} else {
					if (hasMin) {
						return `(min-width: ${(range as TjsScreenRangeWithMin)['min']})`
					} else {
						return `(max-width: ${(range as TjsScreenRangeWithMax)['max']})`
					}
				}
			}
		}
	}

	range: TjsScreenRange
	name: string

	constructor(range: TjsScreenRange, name: string) {
		super(TjsScreenRangeGroup.mediaQueryFor(range))
		this.range = range
		this.name = name
	}

	clone(): this {
		return new TjsScreenRangeGroup(this.range, this.name) as this
	}

	static groupsForBreakpoint(breakpoint: TjsScreenBreakpoint, name: string): TjsScreenRangeGroup[] {
		// noinspection JSDeprecatedSymbols
		if (!Array.isArray(breakpoint)) {
			return this.groupsForBreakpoint([breakpoint], name)
		}

		return breakpoint.map(range => new TjsScreenRangeGroup(range, name))
	}
}