import useAI from "../hooks/useAi";
import { useEffect } from "react";

const Generate = () => {
  const { response, loading } = useAI("image", "draw a fantasy character", 1);

  useEffect(() => {
    if (!loading) {
      console.log(response);
    }
  }, [response, loading]);

  return <div>{loading ? "Loading..." : "Response ready"}</div>;
};

export default Generate;

// "create a unique description of a fantasy style character. describe this character in two sentences."
