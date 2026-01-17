import { Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
