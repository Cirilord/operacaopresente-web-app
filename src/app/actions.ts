'use server'
import Handlebars from 'handlebars'
import jsPDF from 'jspdf'
import { ClientOptions, OpenAI } from 'openai'
import { RESPONSE_TEMPLATE } from './constants'

Handlebars.registerHelper('isArray', function (array: unknown) {
    return Array.isArray(array)
})

Handlebars.registerHelper('join', function (array: unknown, separator: string) {
    return Array.isArray(array) ? array.join(separator) : ''
})

const clientOptions: ClientOptions = { apiKey: process.env.OPENAI_API_KEY }
    , openAi = new OpenAI(clientOptions)

export async function generatePdf(responses: { answer: string | string[], question: string }[]) {

    const template = Handlebars.compile(RESPONSE_TEMPLATE)
        , content = template({ responses })

    try {

        const chatCompletion = await openAi.chat.completions.create({
            messages: [{ role: 'user', content }],
            model: 'gpt-4o-mini', // ou 'gpt-3.5-turbo'
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = JSON.parse(chatCompletion.choices[0].message.content || '') as any[]
            , doc = new jsPDF('p', 'mm', 'a4')
            , margin = 10
            , pageHeight = doc.internal.pageSize.height

        // Capa
        doc.setFontSize(24);
        doc.text("Sugestões de Presentes", margin, 50);
        doc.setFontSize(16);
        doc.text("Uma seleção de ideias personalizadas", margin, 60);
        doc.addPage();

        // Índice
        doc.setFontSize(20);
        doc.text("Índice", margin, 20);
        doc.setFontSize(12);
        data.forEach((suggestion, index) => {
            doc.text(`${index + 1}. ${suggestion.nome_do_presente}`, margin, 30 + (10 * index));
        });
        doc.addPage();

        // Sugestões de Presentes
        doc.setFontSize(20);
        doc.text("Sugestões de Presentes", margin, 20);
        doc.setFontSize(12);

        data.forEach((suggestion, index) => {
            const yPosition = 30 + (60 * index); // Calcula a posição vertical
            doc.text(`${index + 1}. Nome do Presente: ${suggestion.nome_do_presente}`, margin, yPosition);
            doc.text(`   - Explicação: ${suggestion.explicacao}`, margin + 5, yPosition + 10);
            doc.text(`   - Categoria: ${suggestion.categoria}`, margin + 5, yPosition + 20);
            doc.text(`   - Tipo: ${suggestion.tipo_do_presente}`, margin + 5, yPosition + 30);
            doc.text(`   - Faixa de Preço: ${suggestion.faixa_de_preco_estimado}`, margin + 5, yPosition + 40);
            doc.text(`   - Links: ${suggestion.links.join(", ")}`, margin + 5, yPosition + 50);
            doc.text(`   - Experiências Complementares: ${suggestion.experiencias_complementares.join(", ")}`, margin + 5, yPosition + 60);
            doc.text(`   - Dicas: ${suggestion.dicas}`, margin + 5, yPosition + 70);
            doc.text(`   - Recomendação: ${suggestion.recomendacao}`, margin + 5, yPosition + 90);
            doc.text(`   - Keywords: ${suggestion.keywords.join(", ")}`, margin + 5, yPosition + 100);

            // Adiciona uma nova página se a lista for muito longa
            if (yPosition > pageHeight - margin) {
                doc.addPage();
            }
        });

        // Conclusão ou Agradecimento
        doc.addPage();
        doc.setFontSize(16);
        doc.text("Agradecimento", margin, 20);
        doc.setFontSize(12);
        doc.text("Obrigado por usar nosso serviço de sugestões de presentes! Esperamos que você encontre o presente perfeito.", margin, 30);

        const buffer = doc.output('arraybuffer')
            , uint8Array = new Uint8Array(buffer)

        return { data: { input: data, output: Array.from(uint8Array) }, success: true } as const
    }
    catch (error) {

        debugger

        console.log(error)

        return { error: {}, success: false } as const
    }
}