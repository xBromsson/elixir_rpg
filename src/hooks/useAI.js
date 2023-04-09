import axios from "axios";
import { useState, useEffect } from "react";

const useAI = (model, text, number) => {
  const [response, setResponse] = useState("");
  const [isloading, setLoading] = useState(true);

  const config = {
    organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
    apiKey: "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",
    endpoint: "",
  };

  if (model === 'content') {
    config.endpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";
  } else if (model === 'image') {
    config.endpoint = "https://api.openai.com/v1/images/generations";
  } else {
    return; // Return early if model is invalid
  }

  useEffect(() => {
    if (model === 'content') {
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
    } else if (model === 'image') {
      setLoading(true);
      axios
        .post(
          config.endpoint,
          {
            prompt: text,
            n: number,
            size: "256x256"
          },
          {
            headers: {
              Authorization: `Bearer ${config.apiKey}`,
            },
          }
        )
        .then((res) => {
          setResponse(res.data.data[0].url);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [model, text, number, config.endpoint]);

  return { response, isloading, };
};

export default useAI;
