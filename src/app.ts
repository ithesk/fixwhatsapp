import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'



const flowBienvendia = addKeyword('Hola').addAnswer('Hola, ¿en qué puedo ayudarte?')



const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3005) // Iniciar servidor http para recibir mensajes de whatsapp)
  
    provider.http.server.post('/send-message', handleCtx(async(bot, req, res) => {
        const body = req.body
        const phone =   body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        
        await bot.sendMessage(phone, message, { 
            media: mediaUrl   
        })
        res.end('Mensaje enviado')
    }))

    await createBot({
        flow: createFlow([flowBienvendia]),
        database: new MemoryDB(),
        provider
        
    })

}


main()
