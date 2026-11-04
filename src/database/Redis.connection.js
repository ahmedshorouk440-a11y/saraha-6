
import { createClient } from "redis";

 export const client = createClient({
   url: process.env.REDIS_URL  
});

export async function connectRedis(){
    try{
        await client.connect()
 console.log("REDIS CONNECTED SUCCESSFULLY")
   }catch(error){
    console.log("REDIS FAILED")
    }
 }
