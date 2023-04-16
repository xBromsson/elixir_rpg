import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import NpcGrid, { loader as npcGridLoader } from "./components/npcs/NpcGrid";
import ItemGrid, {
  loader as itemGridLoader,
} from "./components/items/ItemGrid";
import ItemDetail, {
  loader as itemDetailLoader,
} from "./components/items/ItemDetail";
import NpcDetail, {
  loader as npcDetailLoader,
} from "./components/npcs/NpcDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/npcs/",
        element: <NpcGrid />,
        loader: npcGridLoader,
      },
      {
        path: "npcs/:id",
        element: <NpcDetail />,
        loader: npcDetailLoader,
      },
      {
        path: "/items/",
        element: <ItemGrid />,
        loader: itemGridLoader,
      },
      {
        path: "items/:id",
        element: <ItemDetail />,
        loader: itemDetailLoader,
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
