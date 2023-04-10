import { Alert } from "@chakra-ui/react";
import { useContext } from "react";
import { APIKeyContext } from "../APIKeyContext";

const APIKeyWarning = () => {
  const { apiKey, apiKeyIsValid } = useContext(APIKeyContext)!;
  return !apiKey ? (
    <Alert status="warning">
      Use the “API Key” button in the side bar to set the OpenAI API key. it.
    </Alert>
  ) : !apiKeyIsValid ? (
    <Alert status="error">
      The API key does not have the correct format. Use the “API Key” button in
      the side bar to set it.
    </Alert>
  ) : null;
};

export default APIKeyWarning;
