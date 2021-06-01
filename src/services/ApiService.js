import axios from 'axios';
import _ from 'lodash';

class ApiService {
  constructor(initConfig) {
    if(_.has(initConfig, 'host') === false) {
      throw new Error("service host is undefined.");
    }
    if(initConfig.host.endsWith("/"))
      this.apiLoc = initConfig.host;
    else this.apiLoc = initConfig.host + "/api/";
  }

  query(actionName, reqData, onResponse, onError) {
    var reqLoc = this.apiLoc + "query/"+ actionName;
    axios.post(reqLoc, reqData).then((resp)=>{
      onResponse(resp.data);
    }).catch((err) => {
      onError(err);
    });
  }

  command(actionName, reqData, onResponse, onError) {
    var reqLoc = this.apiLoc + "command/"+ actionName;
    axios.post(reqLoc, reqData).then((resp)=>{
      onResponse(resp.data);
    }).catch((err) => {
      onError(err);
    });
  }
}

export default ApiService;
