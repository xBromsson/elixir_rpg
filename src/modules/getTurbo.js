import axios from "axios";

function getTurbo(text, number) {
    const config = {
      organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
      apiKey: "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",
      endpoint: "https://api.openai.com/v1/chat/completions",
    };
  
    return new Promise((resolve, reject) => {
        axios
          .post(
            config.endpoint,
            {
                model: 'gpt-3.5-turbo',
              messages: [{"role": "system", "content": "You are a great fantasy world builder, able to create rich storys and characters"},{"role": "user", "content": text}],
              max_tokens: 150,
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
            resolve(res.data.choices[0].message.content);
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          })
        })
    }

 export default getTurbo;   