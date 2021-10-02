const storage=window.localStorage;

//设置
const set=(key,vaulue)=>{
    storage.setItem(key,JSON.stringify(vaulue));
}

//获取
const get=key=>{
    return JSON.parse(storage.getItem(key));
}

//删除
const remove=(key)=>{
    storage.removeItem(key);
}

//清空
const clear=()=>{
    storage.clear();
};

export {set,get,remove,clear};