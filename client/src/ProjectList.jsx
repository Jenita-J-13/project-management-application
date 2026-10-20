
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "12px 0"
      }}
    >
      <h3>{project.projectName}</h3>
      <p>Category: {project.category}</p>
      <p>Status: {project.status}</p>
      <p>Team: {project.team}</p>

      <Link to={`/projects/${project._id}`}>
        View Details
      </Link>
    </div>
  );
}

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProjects();
  }, []);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category))
  ];

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter(
          (project) => project.category === category
        );

  return (
    <div>
      <h2>Project List</h2>

      <label htmlFor="category">Filter by Category: </label>

      <select
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))
      ) : (
        !error && <p>No projects available.</p>
      )}
    </div>
  );
}

export default ProjectList;
