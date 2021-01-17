const algorithmia = require('../node_modules/algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('../node_modules/sbd')

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()

        content.sourceContentOriginal = wikipediaContent.content
        process.on("unhandledRejection", err => {
            console.log(`Problema ao tentar realizar busca. O erro é: ${err.stack}`)
        })
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
        content.sourceContentSanitized = withoutDatesInParentheses
        //console.log(withoutDatesInParentheses)

        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n')
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if(line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMarkdown.join(' ')
        } 
        process.on("unhandledRejection", err => {
            console.log(`Problema ao sanitizar texto. Erro: ${err.stack}`)
        })
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

    function breakContentIntoSentences(content) {
        content.sentences = []
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
        //console.log(sentences) 
        process.on("unhandledRejection", err => {
            console.log(`Problema ao organizar sentenças do texto. Erro: ${err.stack}`)
        })
    }
}

process.on("unhandledRejection", err => {
    console.log(`Não encontrado, tente procurar por outra nomeclatura. Caso haja um erro, ele é: ${err.stack}`)
})

module.exports = robot