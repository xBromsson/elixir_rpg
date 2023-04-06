import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import { useState, useEffect } from "react";

const config = new Configuration({
  organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
  apiKey: "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",
  endpoint: "https://api.openai.com/v1/engines/davinci/completions",
});

const openai = new OpenAIApi(config);

const endpoint =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";

// const openai = new OpenAIApi(config);

const Generate = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios
      .post(
        endpoint,
        {
          prompt:
            "create a unique discription of a fantasy style character. describe this character in two sentences.",
          max_tokens: 100,
          n: 3,
          //   stop: "\n",
          temperature: 0.7,
        },
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${config.apiKey}`,
          },
        }
      )
      .then((res) => {
        setResponse(res.data.choices[0].text);
        console.log(response);
      });

    // setResponse(
    //   openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: "Say this is a test",
    //     max_tokens: 7,
    //     temperature: 0,
    //   })
    // );
  }, []);
};

export default Generate;
