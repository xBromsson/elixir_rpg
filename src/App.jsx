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
      <GridItem bg="gray.700" area={"nav"}>
        <Text h={"75px"}></Text>
        <CategoryList></CategoryList>
      </GridItem>
      <GridItem bg="gray.800" area={"header"} px={5}>
        <HStack justifyContent={"space-between"}>
          <Text color="gray.500" fontSize="4xl" fontWeight={500}>
            Elixir_RPG
          </Text>
          <ColorModeSwitch></ColorModeSwitch>
        </HStack>
      </GridItem>
      <GridItem bg="gray.900" area={"main"}>
        <CardGrid></CardGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
