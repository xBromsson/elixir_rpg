import axios from "axios";

function getTurbo(system, prompt, number) {
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
              messages: [{"role": "system", "content": system},{"role": "user", "content": prompt}],
              max_tokens: 400,
              n: number,
              temperature: 1.1,
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