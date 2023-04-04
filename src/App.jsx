import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      h="100vh"
      templateAreas={`"nav header" 
                      "nav main"`}
      templateColumns={"225px 1fr"}
      templateRows={"75px 1fr"}
    >
      <GridItem bg="gray.600" area={"nav"}></GridItem>
      <GridItem bg="gray.700" area={"header"}></GridItem>
      <GridItem bg="gray.800" area={"main"}></GridItem>
    </Grid>
  );
}

export default App;
