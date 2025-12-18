import { createBrowserRouter, Router, Route } from "react-router-dom";
import Navbar from "./src/Components/Navbar";
import MainLandingPage from "./src/Pages/LandingPage";
import App from "./src/App";
import YoutubeMusicPlayer from "./src/Pages/LandingPage/SearchMusic";

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
                path: "/music",
                element: <YoutubeMusicPlayer />
            },
            {
                path: "/trips/:id",
                element: <div>Trips</div>
            }
        ]
    }
])

export default router;