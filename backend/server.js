import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";
import dns from 'dns'
import studentrecordrouter from "./routers/studentrecord.route.js"; 

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/student",studentrecordrouter);

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