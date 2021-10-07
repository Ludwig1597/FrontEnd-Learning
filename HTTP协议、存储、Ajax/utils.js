//工具函数
//将数据序列化成 urlencoded 格式的字符串
const serialize=param=>{
    const results=[];
    for(const [key,value] of Object.entries(param)){
        results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    //最后results
    //['username=lily','age=18']
    return results.join('&');
};
//数据序列化成JSON格式的字符串
const serializeJSON=param=>{
    return JSON.stringify(param);
}
//给 URL 添加参数
const addURLData=(url,data)=>{
    if(!data) return '';
    const mark=url.includes('?')?'&':'?';
    return `${mark}${data}`;
}
export {serialize,serializeJSON,addURLData};  