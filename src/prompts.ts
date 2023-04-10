import { getHanziCount, isHanzi, isPinyin } from "./helpers";

export const singleCharacterTemplate = `Tell me about the character {{word}}.
Use simplified Chinese characters if possible.
What is are its sounds and meanings?
How common is it? Is it used in speech, writing, or both?
What are the most frequent words that it occurs in?
Give three to five example sentences.
If it is composed of other characters, what are they, and what are their meanings?
List the most common words that it occurs in, and their meanings, by semantic category.
Based on these menaings, what are the senses of {{word}}?
What are some synonyms, and how do they differ?
Suggest three mnemonics for remembering the meanings of {{word}}, based on its shape and/or components.

Follow this example. Use this exact format, with the specific fields as named, and include all of the information requested.

\`
# Character
床

# Pronunciation
chuáng

# Senses
The senses of 床 include bed, couch, and other similar pieces of furniture used for resting or sleeping.

# Frequency
This character is very common and is used in both speech and writing. It frequently appears in words related to sleeping, resting, and furniture.

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

# Components
- 床 is composed of two other characters: 木 (mù) meaning wood and 广 (guǎng) meaning wide. This suggests that the bed is a wide piece of furniture made of wood.

# Synonyms
Some synonyms for 床 include 床榻 (chuáng tà) and 床位 (chuáng wèi), which both refer to a sleeping place or bed. However, they differ in that 床榻 often refers to a traditional Chinese-style bed, while 床位 can refer to a bed in a hospital or dormitory.

# Mnemonics
1. The character looks like a person lying down on a wide piece of wood, representing a bed.
2. The 木 component suggests that the bed is made of wood.
3. The 广 component represents the wide size of the bed.
\`
`;

export const multiCharacterTemplate = `Tell me about the word {{word}}.
Use simplified Chinese characters if possible.
What is its pronunciation in Mandarin?
What are its senses?
How common is it? Is it used in speech, writing, or both?
Give three to three example sentences.
Suggest three mnemonics for remembering the meanings of {{word}}, based on its characters.

Use this template as an example. Use this exact format, with the specific fields as named, and include all of the information requested.

\`
# Pronunciation
nǐ hǎo

# Meaning
The word 你好 is a common greeting used in both speech and writing. It can be translated to "hello" or "hi" in English.

# Examples

1. 你好，我是玛丽。 (nǐ hǎo, wǒ shì mǎ lì) - Hello, I am Mary.
2. 你好吗？ (nǐ hǎo ma?) - How are you?
3. 他向我打了个招呼，说了声“你好”。 (tā xiàng wǒ dǎ le gè zhāo hu，shuō le shēng "nǐ hǎo") - He greeted me and said "hello".

# Menmonics
1. 你 (nǐ) means "you" and 好 (hǎo) means "good", so 你好 is a friendly greeting to say "you are good".
2. The character 好 (hǎo) has the radical "女" which means "woman". So, 你好 can be remembered as a friendly greeting from a woman to a man.
3. The character 好 (hǎo) is made up of the characters "子" which means "child" and "女" which means "woman". So, 你好 can be thought of as a greeting from a child to a woman or vice versa.
\`
`;

export const pinyinTemplate = `Tell me about the pinyin {{word}}.
Use simplified Chinese characters if possible.
Which Hanzi have the pinyin "{{word}}"?
First, list Hanzi that can be used as standalone words, from most to least common.
Then, list Hanzi that can only be used as parts of words, from most to least common.

Use this template as an example. Use this exact format, with the specific fields as named, and include all of the information requested.

\`
# Characters that can be used as words

1. 有 (yǒu) - "to have" or "there is/are". It can also be used as an auxiliary verb to indicate past tense.
Frequency rank: 10
Example: 你有没有看到我的手机？ (Nǐ yǒu méiyǒu kàn dào wǒ de shǒujī?) – Have you seen my phone?

2. 右 (yòu) - "right" as in "right side" or "right direction".
Frequency rank: 335
Example: 我的右手受伤了。 (Wǒ de yòu shǒu shòushāngle.) – My right hand is injured.

3. 友 (yǒu) - "friend".
Frequency rank: 565
Example: 他是我的好友。 (Tā shì wǒ de hǎo yǒu.) – He is my good friend.

4. 幼 (yòu) - "young" or "immature".
Frequency rank: 1374
Example: 这个孩子还太幼稚了。 (Zhège háizi hái tài yòuzhìle.) – This child is still too immature.

5. 佑 (yòu) - "to help" or "to protect".
Frequency rank: 2889
Example: 希望神能保佑我们平安。 (Xīwàng shén néng bǎoyòu wǒmen píng'ān.) – I hope God can bless us and keep us safe.

# Hanzi that can only be used as parts of words

1. 游 (yóu) - "to swim" or "to travel".
Frequency rank: 505
Example: 我喜欢去海边游泳。 (Wǒ xǐhuān qù hǎibiān yóuyǒng.) – I like to swim in the sea.

2. 铀 (yóu) - "uranium".
Frequency rank: 3247
Example: 铀是一种放射性元素。 (Yóu shì yī zhǒng fàngshèxìng yuánsù.) – Uranium is a radioactive element.
\`
  `.replace(/Frequency rank: \d+\n/g, "");

export function identifyWordType(word: string) {
  if (isPinyin(word)) {
    return "pinyin";
  } else if (isHanzi(word)) {
    const hanziCount = getHanziCount(word);
    return hanziCount === 1 ? "hanzi" : "hanzi";
  } else {
    return null;
  }
}

export function chooseTemplate(word: string, type: string) {
  if (type === "hanzi") {
    const hanziCount = getHanziCount(word);
    return hanziCount === 1 ? singleCharacterTemplate : multiCharacterTemplate;
  } else if (type === "pinyin") {
    return pinyinTemplate;
  } else {
    throw new Error("Invalid word type");
  }
}
