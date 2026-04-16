<h1 align="center">
  Weather App
</h1>

<div align="center">

![HTML](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-00B3E0?logo=webpack&logoColor=fff)

</div>

## Live Preview

The live site can be viewed [**here**](https://odin-12.vercel.app).

**_DESCRIPTION_**: This project was built to get a better handle on asynchronous JavaScript, handling data fetching and loading states using `async/await` and Promises via [_Visual Crossing_](https://www.visualcrossing.com/) API. I focused on keeping the code organized as best as i could.

One of the main challenges was dealing with the raw data from the API, so I ended up implementing a mapping layer inside the WeatherModel. This acts as an adapter that cleans up the JSON and returns only the properties I need, which makes the app easily to adapt if in the future the API structure breaks or change.

The ScreenController manages the overall flow of the application, coordinating between the logic and the DOM updates to maintain a solid separation of concerns throughout the codebase.

**_NOTES_**:

**Icons:** The SVG weather icons used in this interface are provided by the [Visual Crossing Icons](https://github.com/visualcrossing/WeatherIcons).

**Backgrounds & Animations:** The dynamic CSS weather backgrounds are not created by me, they were adapted from CSS & UI boilerplates. This is because this goes beyond the lesson of this project, but at the same time i wanted to keep a nice UI looking.

[general-screenshot]: ./src/assets/images/general-screenshot.png "General screenshot"

![General screenshot][general-screenshot]

## Setup

This app uses webpack packages. To run this setup locally:

```bash
npm install
npm run build
npx serve dist
```

After that, just head to [localhost:3000](http://localhost:3000) to see the app running.
