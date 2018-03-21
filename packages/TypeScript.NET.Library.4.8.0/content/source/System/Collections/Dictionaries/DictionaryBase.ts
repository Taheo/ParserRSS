﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
import {areEqual} from "../../Compare";
import {forEach} from "../Enumeration/Enumerator";
import {CollectionBase} from "../CollectionBase";
import {EnumeratorBase} from "../Enumeration/EnumeratorBase";
import {ArgumentNullException} from "../../Exceptions/ArgumentNullException";
import {InvalidOperationException} from "../../Exceptions/InvalidOperationException";
import {extractKeyValue} from "../../KeyValueExtract";
import {IKeyValuePair, KeyValuePair} from "../../KeyValuePair";
import {IDictionary} from "./IDictionary";
import {IEnumerator} from "../Enumeration/IEnumerator";
import {IEnumerableOrArray} from "../IEnumerableOrArray";
import __extendsImport from "../../../extends";
import {KeyNotFoundException} from "../KeyNotFoundException";
import {Action} from "../../FunctionTypes";
// noinspection JSUnusedLocalSymbols
const __extends = __extendsImport;

const VOID0:undefined = void 0;

// Design Note: Should DictionaryAbstractBase be IDisposable?
export abstract class DictionaryBase<TKey, TValue>
extends CollectionBase<IKeyValuePair<TKey,TValue>> implements IDictionary<TKey, TValue>
{
	constructor(source?:IEnumerableOrArray<IKeyValuePair<TKey,TValue>>)
	{
		super(source);
	}


	//noinspection JSUnusedLocalSymbols
	protected _onValueModified(key:TKey, value:TValue|undefined, old:TValue|undefined):void
	{
	}

	protected _addInternal(item:KeyValuePair<TKey, TValue>):boolean
	{
		if(!item)
			throw new ArgumentNullException(
				'item', 'Dictionaries must use a valid key/value pair. \'' + item + '\' is not allowed.'
			);

		return extractKeyValue(item,
			(key, value) => this.addByKeyValue(key, value));
	}

	protected _clearInternal():number
	{
		const _ = this;
		let count = 0;

		for(let key of _.keys)
		{
			if(_.removeByKey(key)) count++;
		}

		return count;
	}

	contains(item:KeyValuePair<TKey, TValue>):boolean
	{
		// Should never have a null object in the collection.
		if(!item || !this.getCount()) return false;

		return extractKeyValue(item,
			(key, value) =>
			{
				// Leave as variable for debugging...
				let v = this.getValue(key);
				return areEqual(value, v);
			});

	}

	protected _removeInternal(item:IKeyValuePair<TKey, TValue>|[TKey,TValue]):number
	{
		if(!item) return 0;

		return extractKeyValue(item,
			(key, value) =>
			{
				// Leave as variable for debugging...
				let v = this.getValue(key);
				return (areEqual(value, v) && this.removeByKey(key))
					? 1 : 0;
			});
	}

	/////////////////////////////////////////
	// IDictionary<TKey,TValue>
	/////////////////////////////////////////

	protected abstract getKeys():TKey[];

	get keys():TKey[] { return this.getKeys(); }

	protected abstract getValues():TValue[];

	get values():TValue[] { return this.getValues(); }


	addByKeyValue(key:TKey, value:TValue):boolean
	{
		if(value===VOID0)
			throw new InvalidOperationException("Cannot add 'undefined' as a value.");

		const _ = this;
		if(_.containsKey(key))
		{
			const ex = new InvalidOperationException("Adding a key/value when the key already exists.");
			ex.data['key'] = key;
			ex.data['value'] = value;
			throw ex;
		}

		return _.setValue(key, value);
	}

	protected abstract _getEntry(key:TKey):IKeyValuePair<TKey,TValue>|null;

	abstract getValue(key:TKey):TValue|undefined;

	getAssuredValue(key:TKey):TValue
	{
		const value = this.getValue(key);
		if(value===VOID0)
			throw new KeyNotFoundException(`Key '${key}' not found.`);
		return value;
	}

	tryGetValue(key:TKey, out:Action<TValue>):boolean
	{
		const value = this.getValue(key);
		if(value!==VOID0)
		{
			out(value);
			return true;
		}
		return false;
	}

	protected abstract _setValueInternal(key:TKey, value:TValue|undefined):boolean;

	/**
	 * Sets the value of an entry.
	 * It's important to know that 'undefined' cannot exist as a value in the dictionary and is used as a flag for removal.
	 * @param key
	 * @param value
	 * @returns {boolean}
	 */
	setValue(key:TKey, value:TValue|undefined):boolean
	{
		// setValue shouldn't need to worry about recursion...
		const _ = this;
		_.assertModifiable();

		let changed = false;
		const old = _.getValue(key); // get the old value here and pass to internal.
		if(!areEqual(value, old) && _._setValueInternal(key, value))
		{
			changed = true;
			_._onValueModified(key, value, old)
		}

		_._signalModification(changed);
		return changed;
	}

	containsKey(key:TKey):boolean
	{
		return !!this._getEntry(key);
	}

	containsValue(value:TValue):boolean
	{
		const e = this.getEnumerator();
		while(e.moveNext())
		{
			if(areEqual(e.current, value, true))
			{
				e.dispose();
				return true;
			}
		}
		return false;
	}

	removeByKey(key:TKey):boolean
	{
		return this.setValue(key, VOID0);
	}

	removeByValue(value:TValue):number
	{
		const _ = this;
		let count = 0;
		for(let key of _.getKeys())
		{
			if(areEqual(_.getValue(key), value, true))
			{
				_.removeByKey(key);
				count++;
			}
		}
		return count;
	}

	importEntries(pairs:IEnumerableOrArray<KeyValuePair<TKey, TValue>>|IEnumerator<KeyValuePair<TKey, TValue>>|null|undefined):number
	{
		// Allow piping through to trigger onModified properly.
		return super.importEntries(<any>pairs);
	}

	protected _importEntries(pairs:IEnumerableOrArray<KeyValuePair<TKey, TValue>>|IEnumerator<KeyValuePair<TKey, TValue>>|null|undefined):number
	{
		const _ = this;
		if(!pairs) return 0;
		let changed:number = 0;
		forEach(pairs,
			pair => extractKeyValue(pair, (key, value) =>
			{
				if(_._setValueInternal(key, value))
					changed++;
			})
		);
		return changed;
	}

	getEnumerator():IEnumerator<IKeyValuePair<TKey, TValue>>
	{
		const _ = this;
		_.throwIfDisposed();

		let ver:number, keys:TKey[], len:number, index = 0;
		return new EnumeratorBase<IKeyValuePair<TKey, TValue>>(
			() =>
			{
				_.throwIfDisposed();
				ver = _._version; // Track the version since getKeys is a copy.
				keys = _.getKeys();
				len = keys.length;
			},

			(yielder) =>
			{
				_.throwIfDisposed();
				_.assertVersion(ver);

				while(index<len)
				{
					const key = keys[index++], value = _.getValue(key);
					if(value!==VOID0) // Still valid?
						return yielder.yieldReturn({key: key, value: value});
				}

				return yielder.yieldBreak();
			}
		);
	}


}


export default DictionaryBase;