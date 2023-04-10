import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import App from "../App";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Layout;
