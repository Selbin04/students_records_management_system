import 'dotenv/config';
import express from "express";
import cors from "cors";
import dns from 'node:dns';
import connectDB from "./database/db.js";
import studentrecordrouter from "./routers/studentrecord.route.js";

if (!process.env.VERCEL) {
    dns.setServers([
        '1.1.1.1',
        '8.8.8.8',
    ]);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: true,
}));
app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({
            message: "Database connection failed",
            error: error.message,
        });
    }
});

app.use('/api/student', studentrecordrouter);

if (!process.env.VERCEL) {
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    };

    startServer();
}

export default app;
