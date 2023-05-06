import getContent from "./getContent"
import getImage from "./getImage"
import getTurbo from "./getTurbo";

async function buildNpc(sliderValues, role) {

    const { alignment } = sliderValues;
    
    const response = await getTurbo(`"You are a master at the art of creating a unique and memorable dnd npc character. 
    Your npc characters are full of rich duality and unique characteristics."`, 
    
    `Please create a dnd npc character that will add depth and flavor to our dnd campaign. This npc characters role in our compaign should be ${role}

Write in present tense, and your response must explicitly be formatted for JSON without any errors. here is the syntax and attributes you must use:

{
"name": "", 
"race": "", //you must choose completely randomly choose from: "orc", "gnome", "human", "elf", "tabaxi", "dwarf" . 
"alignment": "${alignment}"
"quote": "",
"occupation": "", //be creative. limit to 2 words
"appearance": "", //a Dall-E prompt description. max of 2 sentences
"personality": "", //max 1 sentence
"definingmoment": "", //max 3 sentences. dont use the word 'defining moment' in the response.
"plothook": "", //max 2 sentences
"secret": "" //max 1 sentence. be creative and unique.
"personalityquirk": "" //max 1 sentence. 
}

remember your response must be a JSON object. 

`, 1);

console.log(role)


 const character = JSON.parse(response);


// const imageResponse = await getImage(`using a fantasy art style, create a fantasy character with a race of ${character.race} with this description. + ${character.appearance}`, 1);
// character.image = imageResponse

    
character.image = "https://preview.redd.it/i-really-enjoy-making-character-concepts-for-dnd-and-here-v0-7djvh5cv439a1.png?width=640&crop=smart&auto=webp&s=df65473e9b8d448d0439c350f94c4076177c9cf9"

console.log(alignment)

    return character
}

export default buildNpc;