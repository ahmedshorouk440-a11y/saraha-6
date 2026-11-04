
import {EventEmitter} from 'node:events'
import { sendEmail } from '../send.email.js'
import { verifyEmailTemplete } from './email.templates.js'

export const emailEvent = new EventEmitter()



emailEvent.on("sendEmail" , async({recipients, subject , data})=>{
    await sendEmail({
      ...recipients,
      subject,
 html: verifyEmailTemplete({
                ...data,      
                subject,
            }),
    })
})

