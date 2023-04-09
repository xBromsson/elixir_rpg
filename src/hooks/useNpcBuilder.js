import { useEffect, useState } from "react";
import useAI from "./useAi";

const useNpcBuilder = () => {
    
    const [response, setResponse] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const image = useAI('image', "draw a fantasy character", 1)
    const name = useAI('content', 'create a fantasy style character name. It must be first name and last name only', 1)
    const race = useAI('content', 'create a fantasy style character race. It can be up to two words long but no more', 1)
    const flavor = useAI('content', 'create a fantasy style character quote. It must be two sentences long. It should express the characters personality.', 1)



    Promise.all([image, name, race, flavor])
        .then(() => 
        setResponse([image, name, race, flavor]))
        .catch(error => {
        console.log(error)
    })
    



    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const imageResult = await image;
    //             const nameResult = await name;
    //             const raceResult = await race;
    //             const flavorResult = await flavor;
    
    //             setResponse([imageResult, nameResult, raceResult, flavorResult]);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    
    //     fetchData();
    // }, []);

    return {response, isLoading}
}

export default useNpcBuilder;