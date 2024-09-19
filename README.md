# YouTube Video Automation Bot

Este projeto é inspirado na série do Felipe Deschamps e combina várias tecnologias para criar um bot que gera e faz upload automático de vídeos para o YouTube. Utilizando **IBM Watson**, **Adobe After Effects**, **Wikipedia**, **Google Images API**, **Algorithmia**, **JavaScript** e **Node.js**, este bot executa as seguintes tarefas de forma automatizada:

- Coleta de textos da Wikipedia.
- Download e redimensionamento de imagens do Google Images.
- Criação de vídeos usando templates do After Effects de forma headless.
- Upload completo para o YouTube, com título, descrição, tags e thumbnail configurados automaticamente.

## Tecnologias Utilizadas

- **IBM Watson**: Processamento de texto para voz e análise de dados.
- **Adobe After Effects**: Edição e renderização de vídeos via script.
- **Wikipedia API**: Fonte de textos para os vídeos.
- **Google Images API**: Obtenção de imagens relacionadas ao conteúdo.
- **Algorithmia**: Processamento automatizado de imagens e dados.
- **JavaScript/Node.js**: Lógica principal do bot e automação dos processos.

## Funcionalidades

1. **Coleta de dados**: O bot usa a Wikipedia API para obter textos sobre um tópico específico.
2. **Download de imagens**: Com a Google Images API, ele baixa imagens relevantes e redimensiona conforme necessário.
3. **Criação de vídeos**: As imagens e o texto são inseridos em um template do After Effects, que é renderizado no terminal usando um script headless.
4. **Upload no YouTube**: O vídeo gerado é automaticamente enviado para o YouTube, junto com título, descrição, tags e uma thumbnail personalizada.

## Requisitos

- Node.js
- Adobe After Effects com suporte a scripts headless
- API Key para Google Images e Wikipedia
- Conta no IBM Watson para text-to-speech (opcional)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/youtube-video-automation-bot.git
