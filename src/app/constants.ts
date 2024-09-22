export const RESPONSE_TEMPLATE = `Dê 10 sugestões de presentes com base nas seguintes informações e explique como cada sugestão se relaciona com as respostas.

**Instruções:**
- Para cada sugestão, inclua as seguintes informações:
  - **nome_do_presente**: O nome do presente sugerido.
  - **explicacao**: A explicação de como a sugestão se relaciona com as respostas do usuário.
  - **categoria**: A categoria do presente (ex: Experiência, Acessório, Livro).
  - **tipo_do_presente**: O tipo do presente (ex: Objeto, Curso, Viagem, Experiência, Assinatura, Personalização, Desconhecido).
  - **faixa_de_preco_estimado**: A faixa de preço estimada para o presente.
  - **links**: Um array de links onde o presente pode ser adquirido.
  - **experiencias_complementares**: Sugestões de experiências complementares relacionadas aos hobbies.
  - **dicas**: Dicas sobre como escolher o presente ideal.
  - **recomendacao**: Uma recomendação de artigo ou recurso adicional para ajudar na escolha do presente.
  - **keywords**: Palavras-chave relacionadas à ideia do presente.

**Informações do Usuário:**
{{#each responses}}
{{@index}}. {{this.question}} Resposta: {{this.answer}}
{{/each}}

Por favor, retorne **apenas** o resultado em formato de array JSON. **Não inclua nenhuma formatação, texto adicional ou marcação.**.
Retorne o resultado em formato de array JSON da seguinte forma:

\`\`\`json
[
    {
        "nome_do_presente": "string",
        "explicacao": "string",
        "categoria": "string",
        "tipo_do_presente": "string",  // Objeto, Curso, Viagem, Experiência, Assinatura, Personalização, Desconhecido
        "faixa_de_preco_estimado": "string",
        "links": ["string"],
        "experiencias_complementares": ["string"],
        "dicas": "string",
        "recomendacao": "string",
        "keywords": ["string"]
    }
]
\`\`\`
`