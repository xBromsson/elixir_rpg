import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import CardGrid from "./components/CardGrid";
import CategoryList from "./components/CategoryList";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <Grid
      h="100vh"
      templateAreas={`"nav header" 
                      "nav main"`}
      templateColumns={"300px 1fr"}
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
      <GridItem pr={150} pl={1} area={"main"}>
        <CardGrid></CardGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
