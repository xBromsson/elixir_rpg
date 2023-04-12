import getContent from "./getContent"
import getImage from "./getImage"
import getTurbo from "./getTurbo";

async function buildNpc() {
    const image = getImage("A fantasy character. The art style should be professional fantasy", 1);
    const character = await getTurbo(`Create a fantasy style character with these attributes:

    name: 
    race: 
    quote: 
    occupation: 
    backstory:
    personality: 
  
    (separate each attribute with a comma and a space, do not include the attribute names in your response. they must be in the order I listed them to you.`, 1);

    const [name, race, quote, occupation, backstory, personality] = character.split(",").map((str) => str.trim());


    // const name = getContent("create a fantasy style character name. It must be first name and last name only", 1);
    // const race = await getContent("create a fantasy style character race. It can be up to two words long but no more", 1 );
    // const flavor = getContent(`context: name: ${name} race: ${race} . create this fantasy style character quote. It must be only one sentence long. It should express the characters personality.`, 1);
    // const profession = getContent("create a fantasy character profession. It should be no more than two words", 1);
    // const backstory = getContent(`context: name: ${name} race: ${race} create this characters backstory. it should be set in a fantasy world. do not reference its race but you can reference its name in the story.`, 1);
 
    console.log(name)

    return new Promise((resolve, reject) => {
        Promise.all([image, name, race, quote, occupation, backstory, personality])
        .then((res) => { resolve(res) })
        .catch((err) => { reject(err) })
    })
}

export default buildNpc;