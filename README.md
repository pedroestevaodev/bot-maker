# YouTube Video Automation Bot  

<p style="text-align: center;">  
    <a href="https://www.pedroestevao.com">  
        <img src="https://res.cloudinary.com/dge3g9rcw/image/upload/v1740089731/github/lhl9qlfjt914igxz2dl9.webp" alt="Repository illustration" />  
    </a>  
</p>  

This project is inspired by **Filipe Deschamps' series** and combines multiple technologies to create a bot that automatically generates and uploads videos to YouTube. Using **IBM Watson, Adobe After Effects, Wikipedia, Google Images API, Algorithmia, JavaScript, and Node.js**, this bot performs the following automated tasks:  

- Collects text from Wikipedia.
- Downloads and resizes images from Google Images.  
- Creates videos using After Effects templates in a headless environment.  
- Fully uploads to YouTube, including title, description, tags, and thumbnail.  

## Technologies Used  

- **IBM Watson**: Text-to-speech processing and data analysis.  
- **Adobe After Effects**: Video editing and rendering via script.  
- **Wikipedia API**: Source of text for the videos.  
- **Google Images API**: Retrieves images related to the content.  
- **Algorithmia**: Automated image and data processing.  
- **JavaScript/Node.js**: Core logic of the bot and process automation.  

## Features  

1. **Data Collection**: The bot uses the Wikipedia API to gather text about a specific topic.  
2. **Image Downloading**: With the Google Images API, it fetches relevant images and resizes them as needed.  
3. **Video Creation**: The images and text are inserted into an After Effects template, which is rendered in a headless environment via script.  
4. **YouTube Upload**: The generated video is automatically uploaded to YouTube, including title, description, tags, and a custom thumbnail.  

## Requirements  

- Node.js  
- Adobe After Effects with headless scripting support  
- API Key for Google Images and Wikipedia  
- IBM Watson account for text-to-speech (optional)  

## Installation  

1. Clone this repository:  

   ```bash  
   git clone https://github.com/pedroestevaodev/bot-maker.git
   cd bot-maker
   ```  

2. Install dependencies:  

   ```bash  
   npm install  
   ```  

## API: Algorithmia

To test the bots, you need to create your access key. Visit [Algorithmia](https://algorithmia.com/) and sign up. After logging into your account, go to the **Dashboard**, find **API Keys** in the menu, and **copy your key**.

In the project, navigate to the **./credentials** folder and create a file named `algorithmia.json`. Then, add your API key as follows:

```json
{
   "apiKey": "YOUR_API_KEY_HERE"
}
```

## API: Watson

Similarly, go to [IBM](https://cloud.ibm.com/login) and obtain your **Watson** credentials.

Once logged in, go to **Catalog > AI > Natural Language Understanding**. Click *Create* on the new page. Then, in the side menu, look for **Service Credentials**.

With the credentials in hand, create a `watson-nlu.json` file inside **./credentials**:

```json
{
   "apikey": "...",
   "iam_apikey_description": "...",
   "iam_apikey_name": "...",
   "iam_role_crn": "...",
   "iam_serviceid_crn": "...",
   "url": "..."
}
```

## Setup: Google Cloud Platform

Before creating the APIs, you must link your Google account with [Google Cloud Platform](https://cloud.google.com/). Log into **Google Cloud Platform**, click **Start Free Trial**, and accept the **Terms and Conditions**.

> **Note:** Some **Google Cloud Platform** resources require payment information, but we will only use the **free** resources.

### Creating a Project

Now, let's create a project to link the APIs. Click **Select Project** at the top of the page, then **New Project**. Name the project and click **Create**.

Once the project is created, it will appear in a menu where you can select it.

### API: Custom Search API

With the project created, let's enable and configure the API. Click on **APIs & Services > Library** in the left menu.

Search for **Custom Search API**, click **Enable**, and wait for activation.

Once activated, a message will prompt you to create API credentials. Click **Create Credentials**.

Select **Custom Search API** from the dropdown and click **What credentials do I need?**.

Copy your API Key, click **Done**, and return to the project folder. Navigate to **./credentials** and create a new file called **google-search.json** with the following content:

```json
{
   "apiKey": "YOUR_API_KEY_HERE"
}
```

## API: Custom Search Engine

Now, let's configure a custom Google search engine. Visit [Custom Search Engine](https://cse.google.com/cse/create/new), enter **google.com** as the **site to search**, choose your preferred language, and click **Advanced Options**. Select the most generic **Thing** schema and click **Create**.

> **Note:** Learn more about schemas at [schema.org](https://schema.org/docs/full.html).

Next, go to **Control Panel**, enable **Image Search**, and click **Copy to Clipboard**.

Back in **google-search.json**, add a new property with the search engine ID, resulting in:

```json
{
   "apiKey": "YOUR_API_KEY_HERE",
   "searchEngineId": "YOUR_SEARCH_ENGINE_ID"
}
```

## API: YouTube

Now, let's set up the YouTube API. The process is similar to Custom Search API.

Go to [Google Cloud](https://cloud.google.com/) and enable the **YouTube API**. Click **APIs & Services > Library**, search for **YouTube**, and click **Enable**.

> **Note:** In the tutorial, it is recommended to create a new project specifically for the YouTube API.

Click **OAuth Consent Screen** and enter only the **Application Name** (you can customize other fields later).

Go to **Create Credentials > OAuth Client ID**, select **Web Application**, choose an **Application Name**, and enter the following:

- **Authorized JavaScript origins:** `http://localhost:5000`
- **Authorized redirect URIs:** `http://localhost:5000/oauth2callback`

Click **Create**.

A window will appear with your credentials. Click **OK**, then download the credentials file, rename it to **google-youtube.json**, and save it inside the **./credentials** folder.

## How to Use  

1. Run the bot:  

   ```bash  
   node index.js
   ```  

2. The bot will automatically collect data, create the video, and upload it to your YouTube channel.

## Contribution  

Contributions are welcome! Feel free to open issues and submit pull requests.  

## License  

This project is licensed under the **MIT License**.  
