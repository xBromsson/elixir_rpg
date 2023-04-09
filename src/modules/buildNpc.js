import getContent from "./getContent"
import getImage from "./getImage"

function buildNpc() {
    const image = getImage("draw a fantasy character", 1);
    const name = getContent("create a fantasy style character name. It must be first name and last name only", 1);
    const race = getContent("create a fantasy style character race. It can be up to two words long but no more", 1 );
    const flavor = getContent("create a fantasy style character quote. It must be two sentences long. It should express the characters personality.", 1);

    return new Promise((resolve, reject) => {
        Promise.all([image, name, race, flavor])
        .then((res) => { resolve(res) })
        .catch((err) => { reject(err) }) 
    })
}

export default buildNpc;