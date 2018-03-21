/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

import {SystemException, Error} from "../../Exceptions/SystemException";
import __extendsImport from "../../../extends";
// noinspection JSUnusedLocalSymbols
const __extends = __extendsImport;

const NAME:string = 'UnsupportedEnumerableException';


export {Error};

export class UnsupportedEnumerableException extends SystemException
{

	constructor(message?:string)
	{
		super(message || "Unsupported enumerable.");
	}

	protected getName():string
	{
		return NAME;
	}
}

export default UnsupportedEnumerableException;