import { Grid, GridItem, Text } from "@chakra-ui/react";
import CardGrid from "./components/CardGrid";

function App() {
  return (
    <Grid
      h="100vh"
      templateAreas={`"nav header" 
                      "nav main"`}
      templateColumns={"225px 1fr"}
      templateRows={"75px 1fr"}
    >
      <GridItem bg="gray.700" area={"nav"}></GridItem>
      <GridItem bg="gray.800" area={"header"}>
        <Text color="gray.500" pl={10} pt={2} fontSize="4xl" fontWeight={500}>
          Elixir_RPG
        </Text>
      </GridItem>
      <GridItem bg="gray.900" area={"main"}>
        <CardGrid></CardGrid>
      </GridItem>
    </Grid>
  );
}

export default App;
