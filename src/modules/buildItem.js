import getImage from "./getImage"
import getTurbo from "./getTurbo";

async function buildItem(sliderValues) {

    const { alignment } = sliderValues;
    
    const response = await getTurbo(`"You are a master of the art of creating a unique and memorable dnd item.`, 
    
    `Please create a unique item that will add depth and flavor to our dnd campaign. 

    Write in present tense, and you absolutely must provide a response that is formatted for JSON. here is the syntax and attributes you must use:

    {
    "name": "", 
    "description": "",
    }

    `, 1);


 const item = JSON.parse(response);


// const imageResponse = await getImage(`using a fantasy art style, create a fantasy character with a race of ${character.race} with this description. + ${character.appearance}`, 1);
// character.image = imageResponse

    
item.image = "https://mj-gallery.com/e1b6c0a8-cfa0-443b-b33a-ec999ffc9936/grid_0_640_N.webp"

    return item
}

export default buildItem;