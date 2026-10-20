
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single project
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({
      message: "Invalid project ID"
    });
  }
});

// POST a new project
router.post("/projects", async (req, res) => {
  try {
    const { projectName, category, description, status, team } =
      req.body;

    if (!projectName || !category) {
      return res.status(400).json({
        message: "Project name and category are required"
      });
    }

    const project = new Project({
      projectName,
      category,
      description,
      status,
      team
    });

    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
