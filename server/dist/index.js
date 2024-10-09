"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const predefinedResponses = {
    'hi': 'Hello! How can I help you today?',
    'hello': 'Hello! How can I help you today?',
    'tell me about diamonds': 'Diamonds are a girl\'s best friend! They are timeless and elegant.',
    'what about gold jewelry?': 'Gold jewelry is classic and versatile. It never goes out of style.',
    'can you tell me about silver?': 'Silver jewelry is a great choice for those who love a more understated look.',
    'bye': 'Thank you for chatting! Have a great day!',
    'goodbye': 'Thank you for chatting! Have a great day!',
    "what's your favorite color?": "I'm not sure about that. Can you please specify?"
};
// Function to simulate delay
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
app.post('/api/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessage = req.body.message.toLowerCase().trim();
    let response = "I'm not sure about that. Can you please specify?";
    // Check for exact matches first
    if (predefinedResponses.hasOwnProperty(userMessage)) {
        response = predefinedResponses[userMessage];
    }
    else {
        // If no exact match, check for partial matches
        for (const key in predefinedResponses) {
            if (userMessage.includes(key)) {
                response = predefinedResponses[key];
                break;
            }
        }
    }
    // Simulate a delay between 1 to 3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;
    yield simulateDelay(delay);
    res.json({ message: response });
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
