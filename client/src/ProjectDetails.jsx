
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setProject(null);
        setError("");

        const response = await fetch(`/api/projects/${id}`);

        if (!response.ok) {
          throw new Error("Project not found");
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProject();
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to Project List</Link>
      </div>
    );
  }

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div>
      <h2>Project Details</h2>
      <p><strong>Name:</strong> {project.projectName}</p>
      <p><strong>Category:</strong> {project.category}</p>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Team:</strong> {project.team}</p>

      <Link to="/">Back to Project List</Link>
    </div>
  );
}

export default ProjectDetails;
