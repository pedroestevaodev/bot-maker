const algorithmia = require('../node_modules/algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('../node_modules/sbd')
const watsonApiKey = require('../credentials/watson-nlu.json').apikey
const NaturalLanguageUnderstandingV1 = require('../node_modules/watson-developer-cloud/natural-language-understanding/v1.js')

var nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
})

async function robot(content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    limitMaximumSentences(content)
    await fetchKeywordsOfAllSentences(content)

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()

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

    function limitMaximumSentences(content) {
        content.sentences = content.sentences.slice(0, content.maximumSentences)
    }

    async function fetchKeywordsOfAllSentences(content) {
        for (const sentence of content.sentences) {
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
        }
    }

    async function fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
            nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response) => {
                if(error) {
                    throw error
                }
            
                const keywords = response.keywords.map((keyword) => {
                    return keyword.text
                })
                resolve(keywords)
            })
        })
    }
}

process.on("unhandledRejection", err => {
    console.log(`Não encontrado, tente procurar por outra nomeclatura. Caso haja um erro, ele é: ${err.stack}`)
})

module.exports = robot