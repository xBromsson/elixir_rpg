import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import NpcGrid from "./components/NpcGrid";
import NpcDetail, { loader as npcDetailLoader } from "./components/NpcDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/npcs/",
        element: <NpcGrid />,
      },
      {
        path: "npcs/:id",
        element: <NpcDetail />,
        loader: npcDetailLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode="theme.config.initialColorMode">
      {" "}
    </ColorModeScript>
    <RouterProvider router={router} />
  </ChakraProvider>
  // </React.StrictMode>
);
