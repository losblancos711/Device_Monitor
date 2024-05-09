import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./store/Provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { DeviceDetail } from "./pages/DeviceDetail/DeviceDetail";
import { Devices } from "./pages/Devices/Devices";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Devices />,
    errorElement: <NotFound />,
  },
  {
    path: "/devices",
    element: <Devices />,
    errorElement: <NotFound />,
  },
  {
    path: "/devices/:id",
    element: <DeviceDetail />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <div className={`container`}>
        <RouterProvider router={router} />
      </div>
    </StoreProvider>
  </React.StrictMode>
);
