import { sql } from "../config/db.js";

export const createProject = async (request, response) => {

    const { title, technology, summary, description, image, github, website } = request.body;

    if (!title || !technology || !summary || !description || !image || !github || !website) {

        return response
            .status(400)
            .json({
                success: false,
                message: "All fields are required."
            })
    }

    try {

        const newProject = await sql`
            INSERT INTO projects (title, technology, summary, description, image, github, website)
            VALUES (${title}, ${technology}, ${summary}, ${description}, ${image}, ${github}, ${website})
            RETURNING *
        `;

        console.log("New project created:", newProject);
        response
            .status(201)
            .json({
                success: true,
                message: "New project created.",
                data: newProject[0]
            })

    } catch (error) {

        console.log(`Failed to create project: ${error.message}`);
        response
            .status(500)
            .json({
                success: false,
                message: `Create project failed with error: ${error.message}`
            });
    }
};

export const getAllProjects = async (request, response) => {

    try {
        const projects = await sql`
            SELECT * FROM projects
            ORDER BY created_at DESC
            `;

        console.log("Projects", projects);
        response
            .status(200)
            .json({
                success: true,
                data: projects
            });

    } catch (error) {

        console.log(`Failed to get projects: ${error.message}`);
        response
            .status(500)
            .json({
                success: false,
                message: `Get all projects failed with error: ${error.message}`
            });
    }
};

export const getProject = async (request, response) => {

    const { id } = request.params;

    try {

        const project = await sql`
            SELECT * FROM projects
            WHERE id=${id}
        `;

        if (project.length === 0) {

            console.log("Project not found.");
            return response
                .status(400)
                .json({
                    success: true,
                    message: "Project not found."
                });
        }

        console.log("Project", project);
        response
            .status(200)
            .json({
                success: true,
                message: "Successfully get the project.",
                data: project[0]
            });

    } catch (error) {

        console.log(`Failed to get project: ${error.message}`);
        response
            .status(500)
            .json({
                success: false,
                message: `Get project failed with error: ${error.message}`
            });
    }
};

export const updateProject = async (request, response) => {

    const { id } = request.params;
    const { title, technology, summary, description, image, github, website } = request.body;

    if (!title || !technology || !summary || !description || !image || !github || !website) {

        return response
            .status(400)
            .json({
                success: false,
                message: "All fields are required."
            })
    }

    try {

        const updatedProject = await sql`
            UPDATE projects
            SET title=${title}, technology=${technology}, summary=${summary}, description=${description}, image=${image}, github=${github}, website=${website}
            WHERE id=${id}
            RETURNING *
        `;

        if (updatedProject.length === 0) {

            console.log("Project not found.");
            return response
                .status(400)
                .json({
                    success: true,
                    message: "Project not found."
                });
        }

        console.log("Updated project", updatedProject);
        response
            .status(200)
            .json({
                success: true,
                message: "Successfully updated the project.",
                data: updatedProject[0]
            });

    } catch (error) {

        console.log(`Failed to update project: ${error.message}`);
        response
            .status(500)
            .json({
                success: false,
                message: `Update project failed with error: ${error.message}`
            });
    }
};

export const deleteProject = async (request, response) => {

    const { id } = request.params;

    try {

        const deletedProject = await sql`
            DELETE FROM projects
            WHERE id=${id}
            RETURNING *
        `;

        if (deletedProject.length === 0) {

            console.log("Project not found.");
            return response
                .status(400)
                .json({
                    success: true,
                    message: "Project not found."
                });
        }

        console.log("Project deleted.", deletedProject[0]);
        response
            .status(200)
            .json({
                success: true,
                message: "Successfully deleted the project.",
                data: deletedProject[0]
            });

    } catch (error) {

        console.log(`Failed to delete project: ${error.message}`);
        response
            .status(500)
            .json({
                success: false,
                message: `Delete project failed with error: ${error.message}`
            });
    }
};