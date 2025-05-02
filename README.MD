# Amazon product searcher

Welcome to Amazon product searcher, a simple webpage for searching Amazon products online. This application was developed as part of a code challenge in a Trainee Junior Full-stack developer job.

## Applications

- `api`: The app api running with [Express.js](https://expressjs.com/)
- `web`: The front-end app running with [Vite](https://vite.dev/) and pure javascript.

## Technologies used

- [Bun](https://bun.sh/) A fast all-in-one JavaScript runtime
- [Axios](https://axios-http.com/) A promise based HTTP client for the browser and node.js
- [Jsdom](https://github.com/jsdom/jsdom) A JavaScript implementation of various web standards, for use with Node.js
- [Vite](https://vite.dev/): A blazing fast frontend build tool powering the next generation of web applications.

## Project structure

The project structure is organized this way:

```
/
├── api/
│   │── src/
│        ├── controllers/
│        ├── models/
│        ├── routes/
│        ├── types/
│   index.ts
│   package.json
├── web/
│   ├── index.html
│   ├── package.json
│   ├── src/
│        ├── main.js
│        ├── style.css
|
├── README.MD
├── installDependencies.sh
├── run.sh 

```

## Prerequisites

Before Continue you need to install the most important project dependence

- [Bun](https://bun.sh/): 1.2.6 or newer

## How to Run the Project

Follow the steps below to set up and run the project locally:

1. **Fork this repository**
```bash
git clone https://github.com/PHCavalcante/amazon-product-searcher.git
```
2. **Navigate to the project folder**
```bash
cd amazon-product-searcher
```

3. **Install the dependencies using the available script:**
```bash
./installDependencies.sh
```
or install manually
```bash
cd api/ && bun install
```
and for the front-end
```bash
cd ..web/ && bun install
```

> [!TIP]
> If you're on Windows and don't use WSL or Git Bash, run the manual commands above in PowerShell inside each folder.

4. **Start the development applications:**
> [!TIP]
>  A startup script is also available (Unix/macOS only):
```bash
./run.sh
```
Or start both manually in separate terminals:
```bash
cd api/ && bun run dev
```
and for the front-end:
```bash
cd web/ && bun run dev
```

This scripts (or manual commands) will start both the `api` backend and the `web` frontend. By default:

- `api`: [http://localhost:3000](http://localhost:3000)
- `web`: [http://localhost:5173](http://localhost:5173)


## License

This project is licensed under the MIT License. For more details, see the `LICENSE` file in the repository.