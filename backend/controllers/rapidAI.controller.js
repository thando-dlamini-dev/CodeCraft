// server/routes/codeExecution.js
import axios from "axios";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "98604b6fb9mshd46d354f6c0b621p14ea44jsn03b676f0d588",
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
};

export const rapidAIController = async (req, res) => {
    try {
    const { code, language_id, stdin } = req.body;
    if(!code){
      return res.status(400).send("Code is required");
    }
    else if(!language_id){
      return res.status(400).send("Language id is required");
    }
    else if(!stdin){
      return res.status(400).send("Stdin is required");
    }

    const response = await axios.post(
      `${process.env.JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
      {
        source_code: code,
        language_id: language_id || 71, // Default: Python (71)
        stdin: stdin || "",
      },
      { headers }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error in rapidAI controller", error: error.response.data.message, success: false });
    console.log(error.response.data.message);
  }
};

