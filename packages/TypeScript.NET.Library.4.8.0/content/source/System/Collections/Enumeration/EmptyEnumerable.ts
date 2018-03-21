/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {IEnumerable} from "./IEnumerable";
import {IEnumerator} from "./IEnumerator";
import {EmptyEnumerator} from "./EmptyEnumerator";
export class EmptyEnumerable implements IEnumerable<any>{

	constructor() {
		this.isEndless = false;
	}

	getEnumerator():IEnumerator<any> {
		return EmptyEnumerator;
	}

	/**
	 * Provides a way of flagging endless enumerations that may cause issues.
	 */
	readonly isEndless:boolean;
}
