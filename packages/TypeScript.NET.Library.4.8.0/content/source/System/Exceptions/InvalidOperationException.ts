/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */

import {SystemException, Error} from "./SystemException";
import __extendsImport from "../../extends";
// noinspection JSUnusedLocalSymbols
const __extends = __extendsImport;

const NAME:string = 'InvalidOperationException';

export {Error};

export class InvalidOperationException extends SystemException
{

	protected getName():string
	{
		return NAME;
	}

}

export default InvalidOperationException;
