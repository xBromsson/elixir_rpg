import getImage from "./getImage"
import getTurbo from "./getTurbo";

async function buildItem(type) {

    const rarity = "common"
    const class1 = "wizard"

    console.log(type)
    
    const response = await getTurbo(`"You are a master of the art of creating a unique and memorable dnd items.`, 

    `create a dnd item for my dnd campaign. the item should have the following attributes:
    
    {
      "rarity": "${rarity}", // Do NOT change this value
      "description": "", 
      "name": "", //be creative. 
      "category": "${type}", // Do NOT change this value
      "requirements": "", // this can be "none", if applicable. please don't leave it blank though.
      "effects": "" 
    }
    
    Your response must be explicitly formatted as a JSON object.
    
    `, 1);

    console.log(response)
    const item = JSON.parse(response);




// const imageResponse = await getImage(`using a fantasy art style, create a dnd item with this description. + ${item.description}`, 1);
// item.image = imageResponse

    
item.image = "https://mj-gallery.com/e1b6c0a8-cfa0-443b-b33a-ec999ffc9936/grid_0_640_N.webp"

    return item
}

export default buildItem;