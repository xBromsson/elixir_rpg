import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import axios from "axios";

const openaiConfig = {
  apiKey: "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",
  endpoint: "https://api.openai.com/v1/engines/davinci/completions",
};

const useOpenaiApi = (prompt) => {
  const [generatedText, setGeneratedText] = useState("");

  const generateText = async () => {
    try {
      const response = await axios.post(
        openaiConfig.endpoint,
        {
          prompt,
          max_tokens: 60,
          n: 1,
          stop: "\n",
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiConfig.apiKey}`,
          },
        }
      );
      const generatedText = response.data.choices[0].text.trim();
      setGeneratedText(generatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return { generatedText, generateText };
};

const MyComponent = () => {
  const [prompt, setPrompt] = useState("");
  const { generatedText, generateText } = useOpenaiApi(prompt);

  const handleSubmit = (event) => {
    event.preventDefault();
    generateText();
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={handlePromptChange} />
        </label>
        <button type="submit">Generate Text</button>
      </form>
      <p>{generatedText}</p>
    </div>
  );
};

export default MyComponent;
