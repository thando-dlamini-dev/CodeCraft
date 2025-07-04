import { query } from "../lib/db.config.js";

export const saveProjectIdea = async (userId, projectData, userSelections) => {
    try {
        // Log the incoming data
        console.log('Saving project with userId:', userId);
        console.log('Project name:', projectData.project_name);

        
        
        // Extract required fields from the project data
        const {
        project_name,
        summary,
        description,
        tech_stack,
        main_language,
        estimated_deadline,
        difficulty,
        why_this_project,
        required_features,
        learning_resources,
        deployment_options,
        potential_challenges,
        next_steps
        } = projectData;
        
        // Check if the project already exists
        const projectExists = await query(
            `SELECT * FROM project_ideas WHERE user_id = ? AND project_name = ? || description = ?`,
            [userId, project_name, description]
        )

        if(projectExists.length > 0) {
            throw new Error("Project already saved");
        }

        // Validate required fields
        if (!project_name) {
            throw new Error("Missing required field: project_name");
        }
        
        // Check if tech_stack is an array
        if (!Array.isArray(tech_stack)) {
            throw new Error("Tech stack must be an array");
        }
        
        // Create safer JSON handling with error checking
        const safeStringify = (obj) => {
            try {
                return JSON.stringify(obj);
            } catch (err) {
                console.error("JSON stringify error:", err);
                throw new Error(`Failed to stringify object: ${err.message}`);
            }
        };
        
        const queryStr = `INSERT INTO project_ideas (
            user_id,
            project_name,
            summary,
            description,
            tech_stack,
            main_language,
            estimated_deadline,
            difficulty,
            why_this_project,
            required_features,
            learning_resources,
            deployment_options,
            potential_challenges,
            next_steps,
            user_selections
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`;
        
        const params = [
            userId,
            project_name,
            summary || '',
            description || '',
            safeStringify(tech_stack),
            main_language || '',
            estimated_deadline || '',
            difficulty || '',
            why_this_project || '',
            safeStringify(required_features || []),
            safeStringify(learning_resources || []),
            safeStringify(deployment_options || []),
            safeStringify(potential_challenges || []),
            safeStringify(next_steps || []),
            safeStringify(userSelections || {})
        ];
        
        console.log('Executing SQL query with parameters...');
        const result = await query(queryStr, params);
        console.log('Query executed, result:', result);
        
        if (!result || !result.insertId) {
            throw new Error("Failed to insert record - no insertId returned");
        }
        
        return {
            id: result.insertId,
            project_name
        };
    } catch (error) {
        console.error("Error saving project idea:", error);
        // Re-throw with more context
        throw new Error(`Failed to save project idea: ${error.message}`);
    }
}

export const deleteProjectIdea = async (userId, projectId) => {
    try {
        console.log("Deleting project idea with ID:", projectId);
        console.log("User ID:", userId);
        const queryStr = `DELETE FROM project_ideas WHERE id = ? AND user_id = ?`;
        await query(queryStr, [projectId, userId]);
        return { success: true, message: "Project idea deleted successfully" };
    } catch (error) {
        console.log("Error deleting project idea:", error);
        return { success: false, message: "Failed to delete project idea" };
    }
}

export const getProjectIdeasByUserId = async (userId) => {
    try {
        const projects = await query(
            `SELECT * FROM project_ideas WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]);
        
        return projects.map((project) => {
            try {
                return project
            } catch (error) {
                console.error(`Error parsing JSON for project ${project.id}:`, error);
                // Return the project with the problematic fields as empty arrays
                return {
                    ...project,
                    tech_stack: [],
                    required_features: [],
                    learning_resources: [],
                    deployment_options: [],
                    potential_challenges: [],
                    next_steps: [],
                    user_selections: {}
                };
            }
        });
    } catch (error) {
        console.error("Error getting project ideas by user ID:", error);
        throw new Error(`Database error while fetching projects: ${error.message}`);
    }
}