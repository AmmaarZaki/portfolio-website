import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet, { contentSecurityPolicy } from "helmet"
import morgan from "morgan"
import path from "path"

import projectRoutes from "./routes/projectRoute.js"
import { initDb } from "./config/dbtable.js"
import { useArcJet } from "./library/arcjet.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(async (request, response, next) => {
    try {
        const decision = await useArcJet.protect(request, {
            requested: 1, // specifies that each request consumes 1 token
        });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                response.status(429).json({ error: "Too Many Requests" });
            } else if (decision.reason.isBot()) {
                response.status(403).json({ error: "Bot access denied" });
            } else {
                response.status(403).json({ error: "Forbidden" });
            }
            return;
        }

        // check for spoofed bots
        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            response.status(403).json({ error: "Spoofed bot detected" });
            return;
        }

        next();
    } catch (error) {
        console.log("Arcjet error", error);
        next(error);
    }
});

app.use("/api/projects", projectRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (request, response) => {
        response.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
});