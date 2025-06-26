import {
    GoogleGenerativeAI,
} from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
    generationConfig,
    history: [],
})