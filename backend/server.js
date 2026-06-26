import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./database/db.js";


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const startServer = async () => {
    try{
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}

startServer();