//引入常量
import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED} from "./constants.js";
//默认参数
const DEFAULTS={
    method:HTTP_GET,
    //请求头携带的数据
    params:null,
    //params:{
    //    username:'lily',
    //    age:18
    //}
    //username=lily$age=18
    //请求体携带的数据
    data:null,
    //data:{
    //    username:'lily',
    //    age:18
    //}
    //data:FormData数据
    contentType:CONTENT_TYPE_FORM_URLENCODED,
    timeoutTime:0,
    withCredentials:false,

    //方法
    success(){},
    httpCodeError(){},
    error(){},
    abort(){},
    timeout(){}
};

export default DEFAULTS;