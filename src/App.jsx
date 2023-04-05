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
      templateColumns={"225px 1fr"}
      templateRows={"75px 1fr"}
    >
      <GridItem area={"nav"}>
        <Text h={"75px"}></Text>
        <CategoryList></CategoryList>
      </GridItem>
      <GridItem area={"header"} px={5}>
        <HStack justifyContent={"space-between"}>
          <Text fontSize="4xl" fontWeight={500}>
            Elixir_RPG
          </Text>
          <ColorModeSwitch></ColorModeSwitch>
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        <CardGrid></CardGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
