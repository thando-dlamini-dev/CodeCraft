import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";//prevent running index.js test file

export const pdfScan = async (filePath) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fullPath = path.join(__dirname, "..", filePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error("File not found");
    }

    const fileBuffer = fs.readFileSync(fullPath);

    const data = await pdfParse(fileBuffer);

    if(!data){
      throw new Error("Error scanning PDF");
    }

    return data;

  } catch (error) {
    console.error("Error scanning PDF:", error.message);
    throw error;
  }
};
