import axios from "axios";
import { useState, useEffect } from "react";

const config = {
  organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
  apiKey: "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",
  endpoint: "https://api.openai.com/v1/engines/text-davinci-003/completions",
};

const useAI = (text, number) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        config.endpoint,
        {
          prompt: text,
          max_tokens: 100,
          n: number,
          // stop: "\n",
          temperature: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      )
      .then((res) => {
        setResponse(res.data.choices[0].text);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { response, loading };
};

export default useAI;
