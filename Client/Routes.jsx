import { createBrowserRouter, Router, Route } from "react-router-dom";
import Navbar from "./src/Components/Navbar";
import MainLandingPage from "./src/Pages/LandingPage";
import App from "./src/App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLandingPage />
            },
            {
                path: "/trips",
                element: <div>Trips</div>
            },
            {
                path: "/trips/:id",
                element: <div>Trips</div>
            }
        ]
    }
])

export default router;