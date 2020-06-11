import {Group}  from './Group'
import {IGroup} from './things'

export class SimpleGroup extends Group {
	clone(): this {
		return this.cloneDataInto(new SimpleGroup() as this)
	}

	shouldMergeWith(other: IGroup): boolean {
		return false
	}
}