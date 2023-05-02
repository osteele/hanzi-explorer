type decompositionType =
  | "一" // Graphical primitive, non composition (second character is always a deformed version of another character
  | "吅" // Horizontal composition (when repetition, the second character is deformed
  | "吕" // Vertical composition (when repetition, the second character is deformed
  | "回" // Inclusion of the second character inside the first (门, 囗, 匚...
  | "咒" // Vertical composition, the top part being a repetition
  | "弼" // Horizontal composition of three, the third being the repetition of the first
  | "品" // Repetition of three
  | "叕" // Repetition of four
  | "冖" // Vertical composition, separated by "冖"
  | "+"; // Graphical superposition or addition

export const compositionTemplates = {
  一: "a composition of {first} and {second}",
  吅: "a horizontal composition of {first} and {second}",
  吕: "a vertical composition of {first} above {second}",
  回: "composed of {first} enclosing {second}",
  咒: "composed of {first} repeated atop {second}",
  弼: "a composition of {first} and {second}, with {first} occuring twice",
  品: "a three-fold composition of {first} and {second}",
  叕: "a four-fold composition of {first} and {second}",
  冖: "composed of {first} above {second}, separated by 冖",
  "+": "composed of two characters: {first} superposed or added to {second}",
};

type decompositionSignature = "VND";

type DecompositionType = {
  component: string;
  strokes: number;
  decompositionType: decompositionType;
  leftComponent: string;
  leftStrokes: number;
  rightComponent: string;
  rightStrokes: number;
  signature: decompositionSignature;
  notes: string;
  section: string;
};

export async function getCharacterComposition(
  cleanString: string
): Promise<DecompositionType | null> {
  try {
    const API_SERVER =
      import.meta.env.VITE_API_SERVER || "http://localhost:3100";
    const url = `${API_SERVER}/character/${cleanString}/composition`;
    const response = await fetch(url, {
      headers: { contentType: "application/json" },
    });
    if (response.status !== 200) {
      console.error(
        `error while requesting character decomposition: status=${response.status}`
      );
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("error while requesting character decomposition:", error);
  }
  return null;
}
