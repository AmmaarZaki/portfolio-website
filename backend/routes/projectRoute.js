import express from "express";
import { 
    createProject,
    getProject, 
    getAllProjects,
    updateProject,
    deleteProject
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/:id", getProject);
router.get("/", getAllProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;