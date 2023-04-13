import { Icon, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

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

  return (
    <>
      <span>{text}</span>
      <IconButton
        size="xs"
        bg="white"
        p={0}
        m={0}
        icon={
          <Icon
            as={isSpeaking ? FaPause : FaPlay}
            w={2}
            h={2}
            verticalAlign="super"
          />
        }
        aria-label={isSpeaking ? "Stop speaking" : "Speak"}
        onClick={isSpeaking ? handleStop : handleSpeak}
        color={playIconColor}
        isLoading={isSpeaking}
      />
    </>
  );
};

export default TextToSpeech;
