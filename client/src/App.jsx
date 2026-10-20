import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Project Management Application</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Project List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
