import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import eventRoutes from "./routes"

const app: Express = express()

const HOST: string = process.env.BACKEND_HOST || "localhost";
const PORT: number = parseInt(process.env.BACKEND_PORT || "") || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(eventRoutes)

const uri: string = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority;`
console.log(uri)


mongoose
    .connect(uri)
    .then(() =>
        app.listen(PORT, HOST, () =>
            console.log(`Server running on http://${HOST}:${PORT}`)
        )
    )
    .catch(error => {
        throw error
    })