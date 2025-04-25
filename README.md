# Simple Weather App

## Deploy: [simple-weather-app.netlify](https://nadyavalin-simple-weather-app.netlify.app/)

## Technology stack:
![TypeScript](https://img.shields.io/badge/TypeScript-%233178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![Stylelint](https://img.shields.io/badge/Stylelint-%23263D42.svg?style=for-the-badge&logo=stylelint&logoColor=white)

### API documentation:
[openweathermap.org/api/one-call-3](https://openweathermap.org/api/one-call-3) - don't forget to create your own API key

### How to run project locally:
1. run `git clone https://github.com/nadyavalin/simple-weather-app.git`
2. go to `simple-weather-app` folder
3. run `npm install` for installing necessary node modules
4. create an `.env` file in the root of the project, where create the variable `VITE_API_KEY="YOUR_API_KEY"` and add your APY key
5. run `npm run dev` for running project with Vite in develop mode

#### Available scripts:
- `npm run dev` run project with Vite in develop mode
- `npm run build` builds project with Vite in production mode
- `npm run format` formats all files with Prettier
- `npm run ci:format` checks if files are formatted
- `stylelint` checks if css files are formatted
- `stylelint:fix` fix all css files with Stylelint

# Icons were taken from Meteocons

Free to use animated SVG weather icons. Handcrafted by [Bas Milius](https://bas.dev).

## 👀 Preview

- **Filled icons**: https://basmilius.github.io/weather-icons/index-fill.html
- **Outlined icons**: https://basmilius.github.io/weather-icons/index.html

### ⚒ Process

- An icon is designed in Adobe Illustrator.
- Icons are exported to plain SVG files.
- Animations are added by editing SVG files.
- A node.js script minifies the SVG's.

### 🎨 Design files

This repository not only contains the production-ready files, but also the original design
files. You may use these files to adjust icons or even create new ones. The design files
are Adobe Illustrator .ai-files.

### 🌥 Missing an icon?

Please let me know by creating an issue. Keep in mind that I only accept icons that are
somewhat weather related.

---

<p float="left">
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-day.svg" alt="Partly Cloudy Day" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/partly-cloudy-day.svg" alt="Partly Cloudy Day" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/rain.svg" alt="Rain" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/tornado.svg" alt="Tornado" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/fill/clear-night.svg" alt="Clear Night" height="48"/>
</p>

<p float="left">
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/line/clear-day.svg" alt="Partly Cloudy Day" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/line/partly-cloudy-day.svg" alt="Partly Cloudy Day" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/line/rain.svg" alt="Rain" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/line/tornado.svg" alt="Tornado" height="48"/>
    <img src="https://bmcdn.nl/assets/weather-icons/v2.0/line/clear-night.svg" alt="Clear Night" height="48"/>
</p>
