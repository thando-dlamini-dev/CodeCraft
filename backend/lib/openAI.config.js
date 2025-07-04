import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_LEARN_API_KEY,
});

export const generateQuestions = async (content) => {
  try {
    const prompt = `Generate 5 multiple-choice exam questions from the following study material:\n\n${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const questions = response.choices[0].message.content;
    return questions;

  } catch (error) {
    console.error("An error occurred while generating questions.", error.response?.data || error.message);
    throw error;
  }
};
