import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINIAI_API_KEY } from "../constants/constants";

const genAI = new GoogleGenerativeAI(GEMINIAI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
