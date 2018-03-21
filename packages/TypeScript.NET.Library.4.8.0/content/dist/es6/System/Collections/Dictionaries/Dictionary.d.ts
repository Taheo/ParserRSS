import { IKeyValuePair } from "../../KeyValuePair";
import { IEnumerator } from "../Enumeration/IEnumerator";
import { ILinkedNode } from "../ILinkedListNode";
import { Selector } from "../../FunctionTypes";
import DictionaryBase from "./DictionaryBase";
export interface IHashEntry<TKey, TValue> extends ILinkedNode<IHashEntry<TKey, TValue>>, IKeyValuePair<TKey, TValue> {
}
export declare class Dictionary<TKey, TValue> extends DictionaryBase<TKey, TValue> {
    private readonly _keyGenerator;
    private readonly _entries;
    private readonly _buckets;
    constructor(_keyGenerator?: Selector<TKey, string | number | symbol>);
    protected _onDispose(): void;
    protected getCount(): number;
    private _getBucket(hash, createIfMissing?);
    private _getBucketEntry(key, hash?, bucket?);
    protected _getEntry(key: TKey): IHashEntry<TKey, TValue> | null;
    getValue(key: TKey): TValue | undefined;
    protected _setValueInternal(key: TKey, value: TValue | undefined): boolean;
    protected _clearInternal(): number;
    getEnumerator(): IEnumerator<IKeyValuePair<TKey, TValue>>;
    protected getKeys(): TKey[];
    protected getValues(): TValue[];
}
export default Dictionary;
