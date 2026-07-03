import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Landing } from "./pages/Landing";
import { Walkthrough } from "./pages/Walkthrough";
import { Glossary } from "./pages/Glossary";

export function AppRoutes() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/walkthrough" element={<Walkthrough />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
