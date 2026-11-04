
import { client } from "../../../database/Redis.connection.js"

export const set=async({key , value , ttl=undefined} ={})=>{
   if(typeof value == "object"){
    value = JSON.stringify(value)
   }
    return await client.set(key , value ,{EX: ttl} )

}
export const get= async({key}={})=>{
    let value = await client.get(key)
    try{
        return JSON.parse(value)
    }catch(error){
        return value
    }
}
export const exists = async({key}={})=>{
      return await client.exists(key)

}

export const update = async({key, value, ttl=undefined}={})=>{
    if(!await exists({key})){
         return 0
    }
    return await set({key , value, ttl})
}

export const del = async({key}={})=>{
    return await client.del(key) 
}
export const ttl = async({key}={})=>{
    return await client.ttl(key) 
}
export const expire = async({key , ttl}={})=>{
    return await client.expire(key , ttl)
}
