import { generateQuestions} from "../lib/openAI.config.js";

const chatController = async (req, res) => {
    try {
        const { prompt } = req.body;
        if(!prompt){
            return res.status(400).send("Prompt is required");
        }
        const response = await generateQuestions(prompt);
        const parsedResult = JSON.parse(response);

        res.status(200).json({response: parsedResult, success: true});
    } catch (error) {
        res.status(500).json({message: "Error in chat controller", error: error.message, success: false});
    }
}

export default chatController