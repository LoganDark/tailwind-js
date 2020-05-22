import {BlockGroup} from './BlockGroup'
import {IGroup}     from './things'

export class MediaQueryGroup extends BlockGroup {
	/**
	 * The media query to use. It will be inserted as follows:
	 * `@media $mediaQuery {...}`
	 */
	mediaQuery: string

	constructor(mediaQuery: string = '') {
		super()
		this.mediaQuery = mediaQuery
	}

	protected getBlockStart() {
		return `@media ${this.mediaQuery} ${super.getBlockStart()}`
	}

	clone(): this {
		return new MediaQueryGroup(this.mediaQuery) as this
	}

	shouldMergeWith(other: IGroup): boolean {
		return other instanceof MediaQueryGroup && other.mediaQuery == this.mediaQuery
	}
}