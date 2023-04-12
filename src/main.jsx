import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import CardGrid from "./components/CardGrid";
import NpcCardDetail, {
  loader as npcDetailLoader,
} from "./components/NpcCardDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/npcs/",
        element: <CardGrid />,
      },
      {
        path: "npcs/:id",
        element: <NpcCardDetail />,
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
