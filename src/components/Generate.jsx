import useAI from "../hooks/useAi";
import { useEffect } from "react";

const Generate = () => {
  const { response, loading } = useAI(
    "create a unique description of a fantasy style character. describe this character in two sentences.",
    3
  );

  useEffect(() => {
    if (!loading) {
      console.log(response);
    }
  }, [response, loading]);

  return <div>{loading ? "Loading..." : "Response ready"}</div>;
};

export default Generate;
