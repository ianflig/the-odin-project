<h1 align="center">
  To-do List
</h1>

<div align="center">

![HTML](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-00B3E0?logo=webpack&logoColor=fff)

</div>

## Live Preview

The live site can be viewed [**here**](https://odin-11.vercel.app).

**_DESCRIPTION_**:
This To-Do List application was built using Vanilla JavaScript and Webpack as a way to practice application architecture and code organization. After a few days of development, my main focus was to move away from a single-file script and instead implement a clean separation of concerns. I divided the logic into specific modules for DOM manipulation, data storage, core application control and constructors, ensuring that the visual interface and the underlying data remained completely decoupled. This, trying to follow as much SOLID principles as i could (OOP as well).

[general-screenshot]: ./src/images/general-screenshot.png "General screenshot"

![General screenshot][general-screenshot]

## Setup

This app uses webpack packages. To run this setup locally:

```bash
npm install
npm run build
npx serve dist
```

After that, just head to [localhost:3000](http://localhost:3000) to see the app running.
