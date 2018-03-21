import { Regex, Match } from "./RegularExpressions";
import { IEnumerator } from "../Collections/Enumeration/IEnumerator";
export declare class RegexMatchEnumerator {
    private readonly _pattern;
    constructor(pattern: string | RegExp | Regex);
    matches(input: string): IEnumerator<Match>;
    static matches(input: string, pattern: string | RegExp | Regex): IEnumerator<Match>;
}
declare var _default: typeof RegexMatchEnumerator.matches;
export default _default;
