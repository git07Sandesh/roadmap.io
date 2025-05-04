import axios from 'axios';
import dotenv from "dotenv";
dotenv.config(); // 👈 Load .env variables
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const createPath = async (req, res) => {
    const { path } = req.body;
  
    if (!path) {
      return res.status(400).json({ error: "Missing 'path' in request body" });
    }
  
    const prompt = `
  Generate a concept roadmap for the CS topic "${path}".
  Return strictly formatted JSON like:
  {
    "nodes": [{ "id": "unique_id", "label": "Topic name" }],
    "edges": [{ "from": "source_id", "to": "target_id" }]
  }
  Return ONLY valid JSON.
  `;
  
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const rawText = response.data.candidates[0].content.parts[0].text;
  
      console.log("Raw response from Gemini:\n", rawText); // 👈 helpful to debug
  
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}");
      if (start === -1 || end === -1) {
        throw new Error("Could not parse JSON from Gemini response");
      }
  
      const graph = JSON.parse(rawText.slice(start, end + 1));
      res.json(graph);
    } catch (error) {
      console.error("Gemini API error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to generate roadmap", details: error.message });
    }
  };