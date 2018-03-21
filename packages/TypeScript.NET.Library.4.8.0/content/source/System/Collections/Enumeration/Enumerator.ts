﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import {using} from "../../Disposable/dispose";
import {Type} from "../../Types";
import {ArrayEnumerator} from "./ArrayEnumerator";
import {IndexEnumerator} from "./IndexEnumerator";
import {UnsupportedEnumerableException} from "./UnsupportedEnumerableException";
import {SelectorWithIndex, ActionWithIndex, PredicateWithIndex} from "../../FunctionTypes";
import {IEnumerator} from "./IEnumerator";
import {IEnumerable} from "./IEnumerable";
import {IEnumerableOrArray} from "../IEnumerableOrArray";
import {InfiniteValueFactory, InfiniteEnumerator} from "./InfiniteEnumerator";
import {EmptyEnumerator as Empty} from "./EmptyEnumerator";
import {IIterator, IIteratorResult} from "./IIterator";
import {IteratorEnumerator} from "./IteratorEnumerator";
import {ForEachEnumerable} from "./ForEachEnumerable";


const
	STRING_EMPTY:string       = "",
	ENDLESS_EXCEPTION_MESSAGE =
		'Cannot call forEach on an endless enumerable. ' +
		'Would result in an infinite loop that could hang the current process.';

export function throwIfEndless(isEndless:false):true
export function throwIfEndless(isEndless:true):never
export function throwIfEndless(isEndless:boolean|undefined):true|never
export function throwIfEndless(isEndless:boolean|undefined):true|never
{
	if(isEndless)
		throw new UnsupportedEnumerableException(ENDLESS_EXCEPTION_MESSAGE);
	return true;
}

function initArrayFrom(
	source:ForEachEnumerable<any>,
	max:number = Infinity):any[]
{
	if(Type.isArrayLike(source))
	{
		const len = Math.min(source.length, max);
		if(isFinite(len))
		{
			if(len>65535) return new Array(len);
			const result:any[] = [];
			result.length = len;
			return result;
		}
	}
	return [];
}


// Could be array, or IEnumerable...

/**
 * Returns the enumerator for the specified collection, enumerator, or iterator.
 * If the source is identified as IEnumerator it will return the source as is.
 * @param source
 * @returns {any}
 */
export function from<T>(source:ForEachEnumerable<T>|InfiniteValueFactory<T>):IEnumerator<T>
{
	// To simplify and prevent null reference exceptions:
	if(!source)
		return Empty;

	if((source)instanceof(Array))
		return new ArrayEnumerator<T>(<T[]>source);

	if(Type.isArrayLike<T>(source))
	{
		return new IndexEnumerator<T>(
			() =>
			{
				return {
					source: source,
					length: source.length,
					pointer: 0,
					step: 1
				}
			}
		);
	}

	if(!Type.isPrimitive(source))
	{
		if(isEnumerable<T>(source))
			return source.getEnumerator();

		if(Type.isFunction(source))
			return new InfiniteEnumerator(source);

		if(isEnumerator<T>(source))
			return source;

		if(isIterator<T>(source))
			return new IteratorEnumerator<T>(source);

	}

	throw new UnsupportedEnumerableException();
}

export function isEnumerable<T>(instance:any):instance is IEnumerable<T>
{
	return Type.hasMemberOfType<IEnumerable<T>>(instance, "getEnumerator", Type.FUNCTION);
}

export function isEnumerableOrArrayLike<T>(instance:any):instance is IEnumerableOrArray<T>
{
	return Type.isArrayLike(instance) || isEnumerable(instance);
}

export function isEnumerator<T>(instance:any):instance is IEnumerator<T>
{
	return Type.hasMemberOfType<IEnumerator<T>>(instance, "moveNext", Type.FUNCTION);
}

export function isIterator<T>(instance:any):instance is IIterator<T>
{
	return Type.hasMemberOfType<IIterator<T>>(instance, "next", Type.FUNCTION);
}

/**
 * Flexible method for iterating any enumerable, enumerable, iterator, array, or array-like object.
 * @param e The enumeration to loop on.
 * @param action The action to take on each.
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns the total times iterated.  If the enumerable is unrecognized then -1.
 */

export function forEach<T>(
	e:ForEachEnumerable<T>,
	action:ActionWithIndex<T>,
	max?:number):number

export function forEach<T>(
	e:ForEachEnumerable<T>,
	action:PredicateWithIndex<T>,
	max?:number):number

export function forEach<T>(
	e:ForEachEnumerable<T>,
	action:ActionWithIndex<T> | PredicateWithIndex<T>,
	max:number = Infinity):number
{
	if(<any>e===STRING_EMPTY) return 0;

	if(e && max>0)
	{
		if(Type.isArrayLike<T>(e))
		{
			// Assume e.length is constant or at least doesn't deviate to infinite or NaN.
			throwIfEndless(!isFinite(max) && !isFinite(e.length));
			let i = 0;
			for(; i<Math.min(e.length, max); i++)
			{
				if(action(e[i], i)===false)
					break;
			}
			return i;
		}


		if(isEnumerator<T>(e))
		{
			throwIfEndless(!isFinite(max) && e.isEndless);

			let i = 0;
			// Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
			while(max>i && e.moveNext())
			{
				if(action(<any>e.current, i++)===false)
					break;
			}
			return i;
		}

		if(isEnumerable<T>(e))
		{
			throwIfEndless(!isFinite(max) && e.isEndless);

			// For enumerators that aren't EnumerableBase, ensure dispose is called.
			return using(
				(<IEnumerable<T>>e).getEnumerator(),
				f=>forEach(f, action, max)
			);
		}

		if(isIterator<T>(e))
		{
			// For our purpose iterators are endless and a max must be specified before iterating.
			throwIfEndless(!isFinite(max));

			let i = 0, r:IIteratorResult<T>;
			// Return value of action can be anything, but if it is (===) false then the forEach will discontinue.
			while(max>i && !(r = e.next()).done)
			{
				if(action(<any>r.value, i++)===false)
					break;
			}
			return i;
		}
	}

	return -1;

}

/**
 * Converts any enumerable to an array.
 * @param source
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {any}
 */
export function toArray<T>(
	source:ForEachEnumerable<T>,
	max:number = Infinity):T[]
{
	if(<any>source===STRING_EMPTY) return [];

	if(!isFinite(max) && (source)instanceof(Array))
		return source.slice();

	const result:T[] = initArrayFrom(source, max);
	if(-1===forEach(source, (e, i) => { result[i] = e; }, max))
		throw new UnsupportedEnumerableException();

	return result;
}

/**
 * Converts any enumerable to an array of selected values.
 * @param source
 * @param selector
 * @param max Stops after max is reached.  Allows for forEach to be called on infinite enumerations.
 * @returns {TResult[]}
 */

export function map<T,TResult>(
	source:ForEachEnumerable<T>,
	selector:SelectorWithIndex<T,TResult>,
	max:number = Infinity):TResult[]
{
	if(<any>source===STRING_EMPTY) return [];

	if(!isFinite(max) && (source)instanceof(Array))
		return source.map(selector);

	const result:TResult[] = initArrayFrom(source, max);
	if(-1===forEach(source, (e, i) => { result[i] = selector(e, i); }, max))
		throw new UnsupportedEnumerableException();

	return result;
}