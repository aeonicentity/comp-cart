import {Config} from './config.js';

export class ApiHelperClass{
  formatArgs(args){
    let returnString = '?';
    Object.entries(args).forEach((idx,val) => {
      returnString+=escape(idx)+'='+escape(val)+'&';
    });
    return returnString.substring(0,returnString-1);
  }

  callApi(endpoint, method, headers, args){
    return fetch(Config.apiEndpoint+'/'+endpoint+this.formatArgs(args),{
      method: method,
      headers: headers
    });
  }
}

export const ApiHelper = new ApiHelperClass();