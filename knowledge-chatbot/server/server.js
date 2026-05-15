require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const completion = await groq.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content: `
                    You are a multilingual knowledge management chatbot.

                    Rules:
                    - Respond in the same language as the user.
                    - Support English and Spanish.
                    - Promote ethics, autonomy, responsibility and human development.

                    Institutional declaration:
                    "Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción,
                    como ideal regulativo; me dirijo, controlo y dicto mis propias leyes."
                    `
                },
                {
                    role: "user",
                    content: message
                }
            ],

            model: "llama-3.1-8b-instant"

        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.log("FULL ERROR:");
        console.log(error);

        res.status(500).json({
            reply: "The AI service is temporarily unavailable."
        });
    }
});

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});