import { Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProjectPage from "./pages/ProjectPage"
import { useThemeStore } from "./stores/useThemeStore"
import { useEffect } from "react"

function App() {

  const { theme } = useThemeStore();
  console.log('Current theme:', theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (

    <div data-theme={theme}
      className="min-h-screen transition-colors duration-300"
    >
      
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/project/:id"
          element={<ProjectPage />}
        />
      </Routes>

    </div>
  );
}

export default App
