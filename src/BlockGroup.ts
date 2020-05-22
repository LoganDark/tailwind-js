import {Group} from './Group'

/**
 * A {@link Group} that wraps all its children in a CSS block with an indent.
 */
export abstract class BlockGroup extends Group {
	/**
	 * A comment to be added above the block, if you so wish
	 */
	comment: string = ''

	/**
	 * The block start. Includes the opening brace. Defaults to `{`
	 */
	blockStart: string = '{'

	/**
	 * The block end. Includes the closing brace. Defaults to `}`
	 */
	blockEnd: string = '}'

	formatComment() {
		if (this.comment.length === 0) {
			return ''
		}

		if (this.comment.indexOf('\n') > -1) {
			return `/*
 * ${this.comment.replace(/\n/g, '\n * ')}
 */
`.replace(/\s+(?:\n|$)/g, '\n')
		}

		return `/* ${this.comment} */\n`
	}

	protected getBlockStart() {
		return this.blockStart
	}

	protected getBlockEnd() {
		return this.blockEnd
	}

	toCssText(): string {
		return this.children.length === 0
		       ? ''
		       : this.formatComment() + `${this.getBlockStart()}
\t${super.toCssText().replace(/\n/g, '\n\t')}
${this.getBlockEnd()}`
	}
}