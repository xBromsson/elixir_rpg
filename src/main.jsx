import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import NpcGrid from "./components/npcs/NpcGrid";
import ItemGrid from "./components/items/ItemGrid";
import ItemDetail from "./components/items/ItemDetail";
import NpcDetail from "./components/npcs/NpcDetail";
import NpcItems from "./components/npcs/NpcItems";
import NpcOverview from "./components/npcs/NpcOverview";

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
        children: [
          {
            path: "items",
            element: <NpcItems />,
          },
          {
            path: "items/:itemId",
            element: <ItemDetail />,
          },
        ],
      },
      {
        path: "/items/",
        element: <ItemGrid />,
      },
      {
        path: "items/:id",
        element: <ItemDetail />,
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
