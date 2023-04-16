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
      {/* Use an Icon instead of an IconButton, because I haven't figured out how to make the latter compact enough. */}
      <Icon
        as={isSpeaking ? FaPause : FaPlay}
        onClick={isSpeaking ? handleStop : handleSpeak}
        aria-label={isSpeaking ? "Stop speaking" : "Speak"}
        color="blue.300"
        verticalAlign="center"
        w={2}
        h={2}
        mr={1}
      />
      <span>{text}</span>
    </>
  );
};

export default TextToSpeech;
