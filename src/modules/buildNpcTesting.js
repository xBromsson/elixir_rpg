import getContent from "./getContent"
import getImage from "./getImage"
import getTurbo from "./getTurbo";

async function buildNpcTesting() {
    
    const response = await getTurbo(`Create a fantasy style character with the following attributes, 

    Here is a list of characteristics to help guide your character creation at a high level. These are rated on a scale of 1 to 5:

        - Alignment = 3 (1 is absolute evil but 5 is absolute good)
        - Appearance = 3 (1 is hideous but 5 is beautiful)
        - Affluence = 3 (1 is very poor but 5 is very wealthy)

    But you can and should also create your own charactistics and ratings in addition to what is already given to help make a well rounded character.
    And be sure to always speak in present tense.  

    and always write in present tense and respond using the following syntax and attributes:

    {
    "name": "", //should not be influenced by the characteristics
    "race": ["orc", "gnome", "human"], //choose from this array randomly.
    "quote": "",
    "occupation": "",
    "appearance": "", //this will be used in dall-e . so write this as though it is a prompt for dall-e
    "personality": "", //must be no more than 3 sentences. 
    }

 Do not include the characteristics in your response. Remember your response must be contained inside {}`, 1);

//  console.log(response)
 const character = JSON.parse(response);


// const imageResponse = await getImage(`using a fantasy art style, create a fantasy character with a race of ${character.race} with this description. + ${character.appearance}`, 1);
// character.image = imageResponse
// console.log(character)
    
character.image = "https://preview.redd.it/i-really-enjoy-making-character-concepts-for-dnd-and-here-v0-7djvh5cv439a1.png?width=640&crop=smart&auto=webp&s=df65473e9b8d448d0439c350f94c4076177c9cf9"

    return character
}

export default buildNpcTesting;