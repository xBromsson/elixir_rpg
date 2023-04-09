import axios from "axios";

function getContent(text, number) {
    const config = {
      organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
      apiKey: "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",
      endpoint: "https://api.openai.com/v1/engines/text-davinci-003/completions",
    };
  
    return new Promise((resolve, reject) => {
        axios
          .post(
            config.endpoint,
            {
              prompt: text,
              max_tokens: 100,
              n: number,
              temperature: 0.9,
            },
            {
              headers: {
                Authorization: `Bearer ${config.apiKey}`,
              },
            }
          )
          .then((res) => {
            resolve(res.data.choices[0].text);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          })
        })
    }

 export default getContent;   