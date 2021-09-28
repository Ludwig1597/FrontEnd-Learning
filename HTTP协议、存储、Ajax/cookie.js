//写入Cookie
const set = (name, value, { maxAge, domain, path, secure } = {}) => {
    //taget: document.cookie='username=lily; max-age=5; domain='
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (typeof maxAge === 'number') {
        cookieText += `; max-age=${maxAge}`;
    }

    if (domain) {
        cookieText += `; domain=${domain}`;
    }

    if (path) {
        cookieText += `; path=${path}`;
    }

    if (secure) {
        cookieText += `; secure`;
    }

    document.cookie = cookieText;
    //document.cookie='username=lily; max-age=5; domain=';
};

//通过name获取cookie的值
const get = name =>{
    name=`${encodeURIComponent(name)}`;
    //'username=lily; age=18; sex=male'
    const cookies=document.cookie.split('; ');
    //cookies=["username=lily","age=18","sex=male"]
    for(const item of cookies){
        const [cookieName,cookieValue]=item.split('=');
        //["username","lily"]
        if(cookieName==name){
            return decodeURIComponent(cookieValue);
        }
    }
    return;
};

//根据 name、domain 和 path 删除 Cookie
const remove=(name,{domain,path}={})=>{
    set(name,'',{domain,path,maxAge:-1});//最主要的是maxAge=-1，而name用于定位
};
//导出
export {set,get,remove};