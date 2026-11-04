

import bcrypt from 'bcrypt'


export const hash=async(PlainText , Salt_Round = Number(process.env.SALT) || 10)=>{
 const CipherText= await bcrypt.hash(PlainText, Salt_Round)
  return CipherText
}
export const compare = async(PlainText , hashedText)=>{
  const  CipherText = await bcrypt.compare(PlainText , hashedText)
    return CipherText
}