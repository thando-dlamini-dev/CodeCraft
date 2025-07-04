import { CreateRepo } from "../utils/createRepo";

export const repoController = async (req, res) => {
    const { name, repo, description, priv } = req.body
    try {
        if(!name){
            return res.status(400).send("Name is required");
        }
        else if(!repo){
            return res.status(400).send("Repository name is required");
        }
        else if(!description){
            return res.status(400).send("Description is required");
        }
        else if(!priv){
            return res.status(400).send("Status is required");
        }

        const response = await CreateRepo({name, repo, description, priv});
        res.status(200).json({responseData: response, success: true, message: "Repository created successfully"});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Error in repo controller", error: error.message, success: false});
    }
};