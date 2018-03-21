/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 * Based upon: https://msdn.microsoft.com/en-us/library/System.Exception%28v=vs.110%29.aspx
 */
import {SystemException, Error} from "./SystemException";
import {trim} from "../Text/Utility";
import __extendsImport from "../../extends";
// noinspection JSUnusedLocalSymbols
const __extends = __extendsImport;

const NAME:string = 'ArgumentException';

export {Error};

export class ArgumentException extends SystemException
{

	paramName:string;

	// For simplicity and consistency, lets stick with 1 signature.
	constructor(
		paramName:string,
		message?:string,
		innerException?:Error,
		beforeSealing?:(ex:any)=>void)
	{
		let pn = paramName ? ('{' + paramName + '} ') : '';
		super(trim(pn + (message || '')), innerException, (_)=>
		{
			_.paramName = paramName;
			if(beforeSealing) beforeSealing(_);
		});
	}


	protected getName():string
	{
		return NAME;
	}

}

export default ArgumentException;