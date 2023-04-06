import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Box py={50}>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <label htmlFor="prompt">Prompt:</label>
          <textarea {...register("prompt")} id="prompt" type="text"></textarea>
          <button type="submit">Submit</button>
        </VStack>
      </form>
    </Box>
  );
};

export default Form;
