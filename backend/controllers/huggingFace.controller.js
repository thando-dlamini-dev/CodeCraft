import { huggingFace } from "../lib/huggingFace.js";

export const huggingFaceController = async (req, res) => {
    try {
        const userSelections = req.body;

        console.log(userSelections);
        
        // Validate that userSelections is provided and is an object
        if (!userSelections || typeof userSelections !== 'object') {
            return res.status(400).json({
                success: false,
                message: "User selections must be provided as an object"
            });
        }

        if(userSelections.selectedInterests.length < 3){
            return res.status(400).json({
                success: false,
                message: "Please select at least 3 interests"
            })
        }
        if(userSelections.selectedScopeAndTime.length !== 1){
            return res.status(400).json({
                success: false,
                message: "Please select single time scope"
            });
        }
        if(userSelections.selectedOutcomeGoals.length < 2){
            return res.status(400).json({
                success: false,
                message: "Please select at least 2 outcome goals"
            });
        }
        if(userSelections.selectedInspirationSources.length < 2){
            return res.status(400).json({
                success: false,
                message: "Please select at least 2 inspiration sources"
            });
        }
        if(userSelections.selectedTechStackOptions.length < 4){
            return res.status(400).json({
                success: false,
                message: "Please select at least 4 tech stack options"
            });
        }
        
        // Validate that required fields are present
        const requiredFields = [
            'selectedInterests',
            'selectedScopeAndTime',
            'selectedOutcomeGoals',
            'selectedInspirationSources',
            'selectedTechStackOptions'
        ];
        
        for (const field of requiredFields) {
            if (!Array.isArray(userSelections[field])) {
                return res.status(400).json({
                    success: false,
                    message: `${field} must be provided as an array`
                });
            }
        }
        
        // Process the request
        const result = await huggingFace(userSelections);
        
        // Send successful response
        res.status(200).json({
            success: true,
            result: result
        });
        
        // Log the result (consider moving this to a proper logging service in production)
        console.log("App idea generated successfully:", result.project_name);
    } catch (error) {
        console.error("Error in huggingFace controller:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate app idea",
            error: error.message
        });
    }
};