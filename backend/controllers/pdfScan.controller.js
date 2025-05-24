import { pdfScan } from "../utils/pdfscan.js";

export const pdfScanController = async (req, res) => {
    const { filePath } = req.body;
    try {
        if(!filePath){
            return res.status(400).send("File path is required");
        }

        const pdfData = await pdfScan(filePath);
        res.status(200).json({pdfText: pdfData.text, success: true});

    } catch (error) {
        res.status(500).json({error: error.message, message: "Error in pdfScan controller", success: false});
        console.log(error.message, "Error in pdfScan controller");
    }
};