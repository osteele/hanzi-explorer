import { PromptBuilder } from "./PromptBuilder";
import { PromptTemplate } from "./PromptTemplate";
import { getHanziCount, isHanzi, isPinyin } from "./helpers";
import { PromiseOrValue } from "./utils";

export const interestsTemplate = new PromptTemplate(
  `Try to select words, examples, and mnemonics related to the following area(s): {interests}.
Choose example sentences related to these areas.`,
  ["interests"]
);

export const singleHanziInfoTemplate = new PromptTemplate(
  `Tell me about the character {word}.
{components}
Use simplified Chinese characters if possible.
What are the most frequent words that it occurs in?
Give three to five example sentences.
List the most common words that it occurs in, and their meanings, by semantic category.
Based on these meanings, what are the senses of {word}?

Follow the following example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Do not add additional sections.
The Words section should only have words, not sentences comprised of multiple words.
{interestsPrompt}

\`
# Character
床 （chuáng — bed, couch

# Meaning
The senses of 床 include bed, couch, and other similar pieces of furniture used for resting or sleeping.

# Words
- 床上 (chuáng shàng) - on the bed
- 床垫 (chuáng diàn) - mattress
- 床头 (chuáng tóu) - head of the bed
- 床单 (chuáng dān) - bed sheet
- 床铺 (chuáng pù) - bedding

# Examples
1. 我喜欢在舒适的床上睡觉。 (Wǒ xǐhuān zài shūshì de chuáng shàng shuìjiào.) - I like to sleep on a comfortable bed.
2. 他在床上看书。 (Tā zài chuáng shàng kànshū.) - He is reading on the bed.
3. 请把床单换一下。 (Qǐng bǎ chuáng dān huàn yíxià.) - Please change the bed sheet.
\``,
  ["word", "interestsPrompt", "components"]
);

export const singleHanziAdditionalInfoTemplate = new PromptTemplate(
  `Tell me about the character {word}.
Use simplified Chinese characters if possible.
How common is it? Is it used in speech, writing, or both?
What are some synonyms, and how do their meanings differ from those of {word}?

Follow the following example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Do not add additional sections.
\`
# Frequency
This character is very common and is used in both speech and writing.

# Synonyms
Some synonyms for 床 include 床榻 (chuáng tà) and 床位 (chuáng wèi), which both refer to a sleeping place or bed. However, they differ in that 床榻 often refers to a traditional Chinese-style bed, while 床位 can refer to a bed in a hospital or dormitory.
\``,
  ["word"]
);

export const singleHanziAdditonalExamplesTemplate = new PromptTemplate(
  `Given the following information about {word} and these examples, give three to five additional example sentences.

Use this template as an example. Use this exact format.
Except use examples for {word} instead of the example word 床 that is used in the template, unless {word} is 床.

\`
# Additional Examples
1. 我喜欢在舒适的床上睡觉。 (Wǒ xǐhuān zài shūshì de chuáng shàng shuìjiào.) - I like to sleep on a comfortable bed.
2. 他在床上看书。 (Tā zài chuáng shàng kànshū.) - He is reading on the bed.
3. 请把床单换一下。 (Qǐng bǎ chuáng dān huàn yíxià.) - Please change the bed sheet.
\``,
  ["word"]
);

export const singleHanziComponentsTemplate = new PromptTemplate(
  `{components}. Describe its components and how they relate to the meaning of the word.
  Use this template as an example. Use this exact format.

\`
# Components
床 is composed of two other characters: 木 (mù) meaning wood and 广 (guǎng) meaning wide. This suggests that the bed is a wide piece of furniture made of wood. 木 is a sound component.
\``,
  ["components"]
);

export const singleHanziMnemonicsFromComponentsTemplate = new PromptTemplate(
  `{components}
Use these components to make up three stories that can be used as mnemonics for {word}.
These stories should be related to the meaning and shape of the word, and meaning of its components.
Include the hanzi of the word's components in the stories.

The stories should be short, interesting and memorable.
The stories should be related to the senses of the word.
The stories should be related to the senses of the word's components.

Use this template as an example. Use this exact format.

\`
# Mnemonics
1. A bed is made of wood 木 and is wide 广.
2. The horizontal stroke in 床 looks like the mattress of a bed. The vertical strokes are the legs of the bed.
3. The bed exapnds 广 in all directions, like a tree 木.
\``,
  ["word", "components"]
);

export const singleHanziMnemonicsWithoutComponentsTemplate = new PromptTemplate(
  `
Make up three different mnemonics to help remember the meaning of {word}.
Each should be from one- to three-sentences.
They should make use of the shape and meaning of the character, but not its sound or pinyin.
For example, if the word were "丈", the examples would not mention "Zhang".

Use this template as an example. Use this exact format.

\`
# Mnemonics
1. The character 丈 looks like a person standing tall and proud, representing a "measure" of their height or strength.
2. Imagine 丈 as a measuring stick, with its two horizontal lines indicating different lengths, symbolizing the concept of "measure."
3. Picture 丈 as a combination of a "1" on top and a "3" on the bottom, which together make up the number "13," a "measure" of unlucky numbers.
\``,
  ["word"]
);

export const hanziWordInfoTemplate = new PromptTemplate(
  `Tell me about the word {word}.
Use simplified Chinese characters if possible.
What is its pronunciation in Mandarin?
What are its senses?
How common is it? Is it used in speech, writing, or both?
Give three to five example sentences.
Based on the meanings of the characters, explain why word has the meaning that it does.

Use this template as an example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Do not add additional sections.
{interestsPrompt}

\`
# Word
你好 (nǐ hǎo) — hello, hi

# Meaning
The word 你好 is a common greeting used in both speech and writing. It can be translated to "hello" or "hi" in English.

# Examples
1. 你好，我是玛丽。 (nǐ hǎo, wǒ shì mǎ lì) - Hello, I am Mary.
2. 你好吗？ (nǐ hǎo ma?) - How are you?
3. 他向我打了个招呼，说了声“你好”。 (tā xiàng wǒ dǎ le gè zhāo hu，shuō le shēng "nǐ hǎo") - He greeted me and said "hello".

# Explanation
The first character 你 (nǐ) means "you" and is used to refer to the person being addressed. The second character 好 (hǎo) means "good" and is used in a variety of contexts to express positivity, such as when describing something that is good or expressing approval of a situation or idea.
Together, the characters in 你好 convey the meaning of a friendly greeting or expression of goodwill. The word is used to greet someone when meeting them for the first time or as a casual greeting in everyday conversation.
\`
`,
  ["word", "interestsPrompt"]
);

export const pinyinTranslationTemplate = new PromptTemplate(
  `Tell me about the pinyin {word}.
Use simplified Chinese characters if possible.
Which Hanzi have the pinyin "{word}"?
First, list Hanzi that can be used as standalone words, from most to least common.
Then, list Hanzi that can only be used as parts of words, from most to least common.

Use this template as an example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Do not add additional sections.

\`
# Standalone Words

1. 有 (yǒu) - "to have" or "there is/are". It can also be used as an auxiliary verb to indicate past tense.
Example: 你有没有看到我的手机？ (Nǐ yǒu méiyǒu kàn dào wǒ de shǒujī?) – Have you seen my phone?

2. 右 (yòu) - "right" as in "right side" or "right direction".
Example: 我的右手受伤了。 (Wǒ de yòu shǒu shòushāngle.) – My right hand is injured.

3. 友 (yǒu) - "friend".
Example: 他是我的好友。 (Tā shì wǒ de hǎo yǒu.) – He is my good friend.

4. 幼 (yòu) - "young" or "immature".
Example: 这个孩子还太幼稚了。 (Zhège háizi hái tài yòuzhìle.) – This child is still too immature.

5. 佑 (yòu) - "to help" or "to protect".
Example: 希望神能保佑我们平安。 (Xīwàng shén néng bǎoyòu wǒmen píng'ān.) – I hope God can bless us and keep us safe.

# Parts of Words

1. 游 (yóu) - "to swim" or "to travel".
Example: 我喜欢去海边游泳。 (Wǒ xǐhuān qù hǎibiān yóuyǒng.) – I like to swim in the sea.

2. 铀 (yóu) - "uranium".
Example: 铀是一种放射性元素。 (Yóu shì yī zhǒng fàngshèxìng yuánsù.) – Uranium is a radioactive element.
\``,
  ["word"]
);

/**
 * Identifies the type of input based on the given word.
 *
 * @param word The input string to identify the type of.
 * @returns Either "hanzi", "pinyin", or null if the type cannot be identified.
 */
export function identifyInputType(word: string): "hanzi" | "pinyin" | null {
  if (isPinyin(word)) {
    return "pinyin";
  } else if (isHanzi(word)) {
    const hanziCount = getHanziCount(word);
    return hanziCount === 1 ? "hanzi" : "hanzi";
  } else {
    return null;
  }
}

/**
 * Chooses a prompt template or builder based on the type of the input word.
 *
 * @param word The input word to choose a template or builder for.
 * @param type The type of the input word.
 * @param components A promise or value representing the composition of the input word (for Hanzi only).
 * @returns Either a PromptTemplate for the input word, or a PromptBuilder that can generate multiple templates.
 * @throws Error if the type is not valid.
 */
export function chooseTemplate(
  word: string,
  type: string,
  components: PromiseOrValue<string>
): PromptTemplate | PromptBuilder {
  if (type === "hanzi") {
    const hanziCount = getHanziCount(word);
    return hanziCount === 1
      ? new PromptBuilder([
          singleHanziInfoTemplate,
          singleHanziAdditionalInfoTemplate,
          async function () {
            return (await components)
              ? [
                  singleHanziComponentsTemplate,
                  singleHanziMnemonicsFromComponentsTemplate,
                ]
              : singleHanziMnemonicsWithoutComponentsTemplate;
          },
        ])
      : hanziWordInfoTemplate;
  } else if (type === "pinyin") {
    return pinyinTranslationTemplate;
  } else {
    throw new Error("Invalid word type");
  }
}
