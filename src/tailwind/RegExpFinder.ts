export type RegExpFinderEntry<T> = [RegExp, T]

export type RegExpFinderEntries<T> = RegExpFinderEntry<T>[]

export type RegExpFinderMatch<T> = {
	match: RegExpMatchArray,
	entry: RegExpFinderEntry<T>,
	regex: RegExp,
	t: T
}

export class RegExpFinder<T> {
	private readonly _entries: RegExpFinderEntries<T>
	public readonly entries: ReadonlyArray<RegExpFinderEntry<T>>

	constructor(regexps: RegExpFinderEntries<T> = []) {
		this._entries = regexps
		this.entries = this._entries
	}

	add(regexp: RegExp, t: T) {
		this._entries.push([regexp, t])
		return this
	}

	addAll(regexps: ReadonlyArray<RegExpFinderEntry<T>>) {
		for (const entry of regexps) {
			this._entries.push([...entry])
		}

		return this
	}

	remove(something: RegExp | T) {
		for (let i = this._entries.length; i >= 0; i--) {
			const pair = this._entries[i]

			if (pair[0] === something || pair[1] === something) {
				this._entries.splice(i, 1)
			}
		}
	}

	match(str: string): RegExpFinderMatch<T> | null {
		let match: RegExpMatchArray | null

		for (const pair of this._entries) {
			if (match = pair[0].exec(str)) {
				return {
					match: match,
					entry: pair,
					regex: pair[0],
					t    : pair[1]
				}
			}
		}

		return null
	}

	clone() {
		const clone = new RegExpFinder<T>()
		clone.addAll(this.entries)
		return clone
	}
}