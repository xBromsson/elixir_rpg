import getContent from "./getContent";
import getImage from "./getImage";
import getTurbo from "./getTurbo";

async function buildNpc(sliderValues, role) {
  const { alignment } = sliderValues;

  const response = await getTurbo(`"You are really good at creating memorable
  dnd characters. They are always unique and add depth to any dnd campaign`, 
  
  `"please create a dnd character whose role in our campaign is a(n) ${role}. Your character MUST be created as a JSON
  object as follows:
  
  {
      "name": "", 
      "race": "",  
      "alignment": "${alignment}",
      "quote": "",
      "occupation": "", 
      "appearance": "", //a Dall-E prompt description. max of 2 sentences
      "personality": "", //max 1 sentence
      "definingmoment": "", //max 3 sentences. dont use the word 'defining moment' in the response.
      "plothook": "", //max 2 sentences
      "secret": "" //max 1 sentence. be creative and unique.
      "personalityquirk": "" //max 1 sentence. 
  }
  
  Here are the rules you MUST follow when 
  when creating the character: 1. Do not change any of the JSON corresponding values
  if they are already provided. If a value is already provided. just copy it exactly. "`, 1)

  console.log(role);

  const character = JSON.parse(response);

  // const imageResponse = await getImage(`using a fantasy art style, create a fantasy character with a race of ${character.race} with this description. + ${character.appearance}`, 1);
  // character.image = imageResponse

  character.image =
    "https://preview.redd.it/i-really-enjoy-making-character-concepts-for-dnd-and-here-v0-7djvh5cv439a1.png?width=640&crop=smart&auto=webp&s=df65473e9b8d448d0439c350f94c4076177c9cf9";

  console.log(alignment);

  return character;
}

export default buildNpc;
