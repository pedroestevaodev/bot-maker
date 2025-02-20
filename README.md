# YouTube Video Automation Bot  

<p style="text-align: center;">  
    <a href="https://www.pedroestevao.com">  
        <img src="https://res.cloudinary.com/dge3g9rcw/image/upload/v1740089731/github/lhl9qlfjt914igxz2dl9.webp" alt="Repository illustration" />  
    </a>  
</p>  

This project is inspired by **Felipe Deschamps' series** and combines multiple technologies to create a bot that automatically generates and uploads videos to YouTube. Using **IBM Watson, Adobe After Effects, Wikipedia, Google Images API, Algorithmia, JavaScript, and Node.js**, this bot performs the following automated tasks:  

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
   git clone https://github.com/Pedro-Estevao/bot-maker.git
   cd bot-maker
   ```  

2. Install dependencies:  

   ```bash  
   npm install  
   ```  

3. Configure your API credentials in the `.env` file.  

## How to Use  

1. Run the bot:  

   ```bash  
   npm start  
   ```  

2. The bot will automatically collect data, create the video, and upload it to your YouTube channel.  

## Contribution  

Contributions are welcome! Feel free to open issues and submit pull requests.  

## License  

This project is licensed under the **MIT License**.  
