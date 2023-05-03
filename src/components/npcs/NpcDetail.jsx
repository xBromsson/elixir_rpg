import {
  Image,
  Text,
  Grid,
  GridItem,
  Card,
  CardFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Outlet, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../BreadCrumb";
import NpcOverview from "./NpcOverview";
import { OutletDataProvider } from "../../modules/OutletContext";

function NpcDetail() {
  const { id } = useParams();
  const [npc, setNpc] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingNpc, setLoadingNpc] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);

  //fetches initial npc data and updates local state variable.
  useEffect(() => {
    const fetchNpcAndItems = async () => {
      const npcDoc = await getDoc(doc(db, "npcs", id));
      setNpc({ id: npcDoc.id, ...npcDoc.data() });
      setLoadingNpc(false);

      const npcItemsQuery = query(
        collection(db, "npc_items"),
        where("npc_id", "==", id)
      );
      const npcItemsQuerySnapshot = await getDocs(npcItemsQuery);
      const itemIds = npcItemsQuerySnapshot.docs.map(
        (doc) => doc.data().item_id
      );

      const itemDocs = await Promise.all(
        itemIds.map((itemId) => getDoc(doc(db, "items", itemId)))
      );
      setItems(
        itemDocs.map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() }))
      );
      setLoadingItems(false);
    };

    fetchNpcAndItems();
  }, [id]);

  //displays loading when data is beign fetched... needs to be revisted. originally written by chatgpt
  if (loadingNpc || loadingItems) {
    return <div>Loading...</div>;
  }

  return (
    <Card colorScheme="yellow">
      <Grid
        h={"100 vh"}
        templateAreas={`"left right"`}
        templateColumns={"25% 1fr"}
        templateRows={"1fr"}
      >
        <GridItem p={5} area={"left"}>
          <Card bg={"gray.800"} align={"center"} overflow={"hidden"}>
            <Image width={"100%"} src={npc.image}></Image>
            <CardFooter>
              <Text as={"i"}>"{npc.quote}"</Text>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem p={5} area={"right"}>
          <Tabs colorScheme="gray.800">
            <TabList mb="1em">
              <Tab>Overview</Tab>
              <Tab as={Link} to={`/npcs/${id}/items`}>
                Items
              </Tab>
              <Tab>Notes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                {/* Overview Tab */}
                <NpcOverview npc={npc} />
              </TabPanel>
              <TabPanel p={0}>
                {/* Items Tab */}
                <OutletDataProvider value={{ items }}>
                  <Outlet />
                </OutletDataProvider>
              </TabPanel>
              <TabPanel p={0}>
                {/* Notes Tab */}
                {/* Empty for now */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Card>
  );
}

export default NpcDetail;
