import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import CreateProfile from "./pages/CreateProfile.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

let router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "loading..." }),
    Component() {
      return <LandingPage />;
    },
  },
  {
    path: "/createProfile",
    loader: () => ({ message: "loading..." }),
    Component() {
      return <CreateProfile />;
    },
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </QueryClientProvider>
);
