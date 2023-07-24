import axios from "axios";

function getImage(text, number) {
    const config = {
      organization: "org-jXq1jagmrAh2SvVmFUvvOHlj",
      apiKey: "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",
      endpoint: "https://api.openai.com/v1/images/generations",
    };
  
    return new Promise((resolve, reject) => {
        axios
            .post(
            config.endpoint,
            {
                prompt: text,
                n: number,
                size: "256x256",
            },
            {
                headers: {
                Authorization: `Bearer ${config.apiKey}`,
                },
            }
            )
            .then((res) => {
            resolve(res.data.data[0].url);
            })
            .catch((err) => {
            console.error(err);
            reject(err);
            })
    })
}

 export default getImage;   