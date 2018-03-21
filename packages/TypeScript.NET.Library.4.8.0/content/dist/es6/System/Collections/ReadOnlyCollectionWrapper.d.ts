import { ReadOnlyCollectionBase } from "./ReadOnlyCollectionBase";
import { ICollection } from "./ICollection";
import { IEnumerator } from "./Enumeration/IEnumerator";
export default class ReadOnlyCollectionWrapper<T> extends ReadOnlyCollectionBase<T> {
    constructor(collection: ICollection<T> | ArrayLike<T>);
    private __getCount;
    private __getEnumerator;
    protected _getCount(): number;
    protected _getEnumerator(): IEnumerator<T>;
    protected _onDispose(): void;
}
