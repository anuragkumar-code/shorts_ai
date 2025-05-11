
# ShortsEngine

ShortsEngine is a backend service for generating YouTube Shorts video ideas based on YouTube captions. It extracts captions from a given YouTube URL, processes them, and generates short video scripts along with relevant hashtags using AI.

## Features

- **YouTube URL Input**: Accepts a YouTube video URL to extract captions.
- **Caption Extraction**: Extracts captions from the provided YouTube video URL.
- **AI Short Generator**: Generates short video scripts based on the extracted captions, including a title, script, and hashtags.

## Setup

### Prerequisites

- Node.js v14 or higher
- npm (Node Package Manager)
- FFmpeg (if video processing is to be added later)

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/shortsengine.git


2. Navigate to the project folder:


   cd shortsengine


3. Install the necessary dependencies:


   npm install


### Running the Project

To start the application locally, use the following command:

npm run dev


This will start the application in development mode. The server will be accessible at `http://localhost:5000`.

### API Documentation

#### POST `/generate-shorts`

* **Description**: Accepts a YouTube video URL, extracts captions, and generates a short video idea with a title, script, and hashtags.
* **Request Body**:


  {
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }

* **Response** (Example):


  {
    "shorts": [
      {
        "title": "Epic Rickroll Dance Challenge",
        "script": "Start with a serious face, then suddenly start dancing to ♪ Never gonna give you up, Never gonna let you down ♪ and challenge your friends to do the same.",
        "hashtags": ["#RickrollChallenge", "#DanceChallenge"]
      },
      {
        "title": "The Ultimate Rickroll Prank",
        "script": "Set up a scene promising a big reveal or surprise. At the climax, start playing ♪ We're no strangers to love ♪ and enjoy the reactions.",
        "hashtags": ["#RickrollPrank", "#Gotcha"]
      }
    ]
  }


### Error Handling

* If a `youtubeUrl` is not provided in the request, the response will be:


  { "error": "YouTube URL is required." }

* In case of any internal error, a generic error message is returned:


  { "error": "Something went wrong." }


## Roadmap

* Remove the dependency on `ytdl-core` for downloading YouTube videos and captions.
* Implement more advanced AI-based short generation with better content analysis.
* Add video downloading and clipping capabilities using FFmpeg.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request with your changes. Please ensure that your code is properly tested and documented.



## Acknowledgments

* **AI Shorts Generator**: A hypothetical AI service to generate creative short video scripts.
* **FFmpeg**: For video processing (to be integrated later).
