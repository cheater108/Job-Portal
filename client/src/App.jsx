import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    AddJob,
    EditJob,
    HomePage,
    NotFound,
    UserPage,
    ViewJob,
} from "./pages";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
                <Route path="/view/:jobId" element={<ViewJob />} />
                <Route path="/edit/:jobId" element={<EditJob />} />
                <Route path="/add" element={<AddJob />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
