import http from 'http';
import express from 'express';
import setupRoutes from "./routes.js";
import cors from "cors"


console.log("Starting server")

const app = express()

app.use(cors())

app.use(express.static('public'))

setupRoutes(app)

const PORT = process.env.PORT ?? 6060;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
