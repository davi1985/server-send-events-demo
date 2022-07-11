import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./Form";
import { UserPage } from "./UserPage";
import { WaitingPage } from "./WaitingPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />

        <Route path="/wait" element={<WaitingPage />} />

        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
