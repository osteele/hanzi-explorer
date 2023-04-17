import { Icon, IconButton, useColorModeValue, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { FaPause } from "react-icons/fa";

type Props = {
  text: string;
};

const TextToSpeech = ({ text }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const playIconColor = useColorModeValue("green.500", "green.200");

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    synth.speak(utterance);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
  };

  const characterCount = text.length;
  const boxSize = characterCount <= 2 ? 3 : 4;
  return (
    <Text
      onClick={isSpeaking ? handleStop : handleSpeak}
      style={{ cursor: "pointer" }}
      _hover={{ color: "blue.500" }}
      display="inline-block"
    >
      {/* Use an Icon instead of an IconButton, because I haven't figured out how to make the latter compact enough. */}
      <Icon
        as={isSpeaking ? FaPause : AiFillSound}
        aria-label={isSpeaking ? "Stop speaking" : "Speak"}
        color="blue.300"
        verticalAlign="center"
        transform={`translateY(${boxSize / 2}px)`}
        w={boxSize}
        h={boxSize}
      />
      {/* <IconButton
        aria-label={isSpeaking ? "Stop speaking" : "Speak"}
        icon={<Icon as={isSpeaking ? FaPause : AiFillSound} />}
        color="blue.300"
        size="sm"
        variant="ghost"
        m={-1}
        p={0}
        onClick={isSpeaking ? handleStop : handleSpeak}
      /> */}
      <span>{text}</span>
    </Text>
  );
};

export default TextToSpeech;
