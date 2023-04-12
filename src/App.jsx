import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import CardGrid from "./components/CardGrid";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import { Outlet } from "react-router-dom";
import getTurbo from "./modules/getTurbo";

function App() {
  // const test = getTurbo("build a fantasy character", 1).then((res) => {
  //   console.log(res);
  // });

  // console.log(test);

  return (
    <Grid
      h="100vh"
      templateAreas={`"nav header" 
                      "nav main"`}
      templateColumns={"350px 1fr"}
      templateRows={"75px 1fr"}
    >
      <GridItem px={5} area={"nav"}>
        <Text h={"75px"}></Text>
        <CategoryList></CategoryList>
      </GridItem>
      <GridItem area={"header"} px={5}>
        {" "}
        <Text h={"75px"} fontSize="4xl" fontWeight={500}>
          Elixir_RPG
        </Text>
      </GridItem>
      <GridItem pr={100} pl={1} area={"main"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
