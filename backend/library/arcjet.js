import arcjet, { tokenBucket, shield, detectBot, slidingWindow } from "@arcjet/node"
import dotenv from "dotenv"

dotenv.config();

export const useArcJet = arcjet({

    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 30,
            interval: 5,
            capacity: 20
        })
    ]
});