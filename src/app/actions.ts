'use server'
import { ClientOptions, OpenAI } from 'openai'

const clientOptions: ClientOptions = { apiKey: process.env.OPENAI_API_KEY }
    , openAi = new OpenAI(clientOptions)

export async function generatePdf(data: unknown) {

    const chatCompletion = await openAi.chat.completions.create({
        messages: [{ role: 'user', content: 'Olá, como posso usar a API do ChatGPT?' }],
        model: 'gpt-4o-mini', // ou 'gpt-3.5-turbo'
    })

    console.log(chatCompletion.choices[0])

    console.log(process.env.OPENAI_API_KEY)

    return data
}