const API_SERVER = process.env.API_SERVER || "http://localhost:3100";

enum DecompositionType {
  // non composition (second character is always a deformed version of another character)
  GraphicalPrimitive = "一",
  // Horizontal composition (when repetition, the second character is deformed)
  HorizontalComposition = "吅",
  // Vertical composition (when repetition, the second character is deformed)
  VerticalComposition = "吕",
  // Inclusion of the second character inside the first (门, 囗, 匚...)
  Inclusion = "回",
  // Vertical composition, the top part being a repetition
  TopVerticalComposition = "咒",
  // Horizontal composition of three, the third being the repetition of the first
  TripleHorizontalComposition = "弼",
  // Repetition of three
  TripleRepetition = "品",
  // Repetition of four
  QuadrupleRepetition = "叕",
  // Vertical composition, separated by "冖"
  SeparatedVerticalComposition = "冖",
  // Graphical superposition or addition
  GraphicalSuperpositionOrAddition = "+",
}

export const decompositionTemplateStrings: Record<DecompositionType, string> = {
  一: "a composition of {first} and {second}",
  吅: "a horizontal composition of {first} and {second}",
  吕: "a vertical composition of {first} above {second}",
  回: "composed of {first} enclosing {second}",
  咒: "composed of {first} repeated atop {second}",
  弼: "a composition of {first} and {second}, with {first} occuring twice",
  品: "a three-fold composition of {first} and {second}",
  叕: "a four-fold composition of {first} and {second}",
  冖: "composed of {first} above {second}, separated by 冖",
  "+": "composed of two characters: {first} superposed over or added to {second}",
};

type DecompositionRecord = {
  component: string;
  strokes: number;
  decompositionType: DecompositionType;
  leftComponent: string;
  leftStrokes: number;
  rightComponent: string;
  rightStrokes: number;
  signature: string;
  notes: string;
  radical: string;
};

export async function getCharacterDecomposition(
  character: string
): Promise<DecompositionRecord | null> {
  try {
    const url = `${API_SERVER}/character/${character}/composition`;
    const response = await fetch(url, {
      headers: { contentType: "application/json" },
    });
    if (response.status !== 200) {
      console.error(
        `error while requesting character decomposition for ${character}: status=${response.status}`
      );
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(
      `error while requesting character decomposition for ${character}:`,
      error
    );
  }
  return null;
}
