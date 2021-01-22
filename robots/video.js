const gm = require('gm').subClass({ imageMagick: true })
const state = require('./state.js')
const spawn = require('child_process').spawn
const path = require('path')
const rootPath = path.resolve(__dirname, '..')
const hbjs = require('handbrake-js')
const fs = require('fs')
const fromRoot = relPath => path.resolve(rootPath, relPath)

async function robot() {
    console.log('> [BOT-Vídeo] Iniciando...')
    const content = state.load()

    await convertAllImages(content)
    await createAllSentenceImages(content)
    await createYouTubeThumbnail()
    await createAfterEffectsScript(content)
    await renderVideoWithAfterEffects()

    state.save(content)

    async function convertAllImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await convertImage(sentenceIndex)
        }
    }

    async function convertImage(sentenceIndex) {
        return new Promise((resolve, reject) => {
            const inputFile = `./content/${sentenceIndex}-original.png[0]`
            const outputFile = `./content/${sentenceIndex}-converted.png`
            const width = 1920
            const height = 1080

            gm()
                .in(inputFile)
                .out('(')
                .out('-clone')
                .out('0')
                .out('-background', 'white')
                .out('-blur', '0x9')
                .out('-resize', `${width}x${height}^`)
                .out(')')
                .out('(')
                .out('-clone')
                .out('0')
                .out('-background', 'white')
                .out('-resize', `${width}x${height}`)
                .out(')')
                .out('-delete', '0')
                .out('-gravity', 'center')
                .out('-compose', 'over')
                .out('-composite')
                .out('-extent', `${width}x${height}`)
                .write(outputFile, (error) => {
                    if (error) {
                        return reject(error)
                    }
                    console.log(`> [BOT-Vídeo] Imagem convertida: ${inputFile}`)
                    resolve()
                })
        })
    }

    async function createAllSentenceImages(content) {
        for (let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++) {
            await createAllSentenceImage(sentenceIndex, content.sentences[sentenceIndex].text)
        }
    }

    async function createAllSentenceImage(sentenceIndex, sentenceText) {
        return new Promise((resolve, reject) => {
            const outputFile = fromRoot(`./content/${sentenceIndex}-sentence.png`)

            const templateSettings = {
                0: {
                    size: '1920x400',
                    gravity: 'center'
                },
                1: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                2: {
                    size: '800x1080',
                    gravity: 'west'
                },
                3: {
                    size: '1920x400',
                    gravity: 'center'
                },
                4: {
                    size: '1920x1080',
                    gravity: 'center'
                },
                5: {
                    size: '800x1080',
                    gravity: 'west'
                },
                6: {
                    size: '1920x400',
                    gravity: 'center'
                },
            }

            gm()
                .out('-size', templateSettings[sentenceIndex].size)
                .out('-gravity', templateSettings[sentenceIndex].gravity)
                .out('-background', 'transparent')
                .out('-fill', 'white')
                .out('-kerning', '-1')
                .out(`caption:${sentenceText}`)
                .write(outputFile, (error) => {
                    if (error) {
                        return reject(error)
                    }
                    console.log(`> [BOT-Vídeo] Sentença criada: ${outputFile}`)
                    resolve()
                })
        })
    }

    async function createYouTubeThumbnail() {
        return new Promise((resolve, reject) => {
            gm()
                .in(fromRoot('./content/0-converted.png'))
                .write(fromRoot('./content/youtube-thumbnail.jpg'), (error) => {
                    if (error) {
                        return reject(error)
                    }
                    console.log('> [BOT-Vídeo] Criando thumbnail do vídeo')
                    resolve()
                })
        })
    }

    async function createAfterEffectsScript(content) {
        await state.saveScript(content)
    }

    async function renderVideoWithAfterEffects() {
        return new Promise((resolve, reject) => {
            const aerenderFilePath = '/Program Files/Adobe/Adobe After Effects 2020/Support Files/aerender.exe'
            const templateFilePath = fromRoot('./templates/1/template.aep')
            const destinationFilePath = fromRoot('./content/output.mov')
            const destinationFilePathConverted = fromRoot('./content/output.mp4')
            
            console.log('> [BOT-Vídeo] Iniciando After Effects...')

            const aerender = spawn(aerenderFilePath, [
                '-comp', 'main',
                '-project', templateFilePath,
                '-output', destinationFilePath
            ])

            aerender.stdout.on('data', (data) => {
                process.stdout.write(data)
            })

            aerender.on('close', () => {
                console.log('> [BOT-Vídeo] After Effects fechado! !')
                console.log("> [BOT-Vídeo] Convertendo para .mp4")
                hbjs
                    .spawn({
                        input: destinationFilePath,
                        output: destinationFilePathConverted
                    })
                    .on("error", err => {
                        console.error(`> [BOT-Vídeo] Erro encontrado ao tentar converter o vídeo: ${err}`)
                    })
                    .on("complete", progress => {
                        console.log("> [BOT-Vídeo] Codificação concluída com sucesso! !");
                        fs.unlinkSync(destinationFilePath, err => {
                            if (err) {
                                console.error(`> [BOT-Vídeo] Erro ao tentar remorver o arquivo .mov: ${err}`)
                            }
                            console.log(`> [BOT-Vídeo] output.MOV removido.`)
                        })
                        resolve()
                    })
            })
        })
    }
}
module.exports = robot