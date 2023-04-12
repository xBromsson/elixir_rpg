import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import CardGrid from "./components/CardGrid";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import { Outlet } from "react-router-dom";
import getTurbo from "./modules/getTurbo";

function App() {
  return (
    <Grid
      h="100vh"
      templateAreas={`"header header" 
                      "nav main"`}
      templateColumns={"200px 1fr"}
      templateRows={"125px 1fr"}
    >
      <GridItem px={5} area={"nav"}>
        <CategoryList></CategoryList>
      </GridItem>
      <GridItem alignSelf={"center"} area={"header"} px={5}>
        {" "}
        <Text h={"75px"} fontSize="6xl" fontWeight={700}>
          Elixir_RPG
        </Text>
      </GridItem>
      <GridItem pr={50} pl={1} area={"main"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
