import { getHanziCount, isHanzi, isPinyin } from "./helpers";

export const interestsTemplate = `Try to select words, examples, and mnemonics related to the following area(s): {{interests}}.
Choose example sentences related to these areas.`;

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
Make up three stories that can be used as mnemonics.
These stories should be related to the meaning and shape of the word, and meaning of its components.
The stories should be short, interesting and memorable.
The stories should be related to the senses of the word.
The stories should be related to the senses of the word's components.
Include the hanzi of the words components in the stories.

Follow the following example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Except don't use "…" as examples, use real examples.
The Words section should only have words, not sentences comprised of multiple words.
{{interests}}

\`
# Character
床

# Pronunciation
chuáng

# Frequency
This character is very common and is used in both speech and writing.

# Senses
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
4. …
5. …

# Components
- 床 is composed of two other characters: 木 (mù) meaning wood and 广 (guǎng) meaning wide. This suggests that the bed is a wide piece of furniture made of wood. 木 is a sound component.

# Synonyms
Some synonyms for 床 include 床榻 (chuáng tà) and 床位 (chuáng wèi), which both refer to a sleeping place or bed. However, they differ in that 床榻 often refers to a traditional Chinese-style bed, while 床位 can refer to a bed in a hospital or dormitory.

# Mnemonics
1. Once upon a time, there was a woodcutter who had a very wide bed made of wood. He loved to sleep on it at night, but during the day, he would chop wood with his axe. The sound of his axe echoed throughout the forest, and the animals would come to watch him work. They were amazed by his strength and determination. Whenever the woodcutter got tired, he would take a nap on his wide wooden bed, and the animals would keep watch over him until he woke up.
2. Long ago, a wise old man lived in a small village. He had a wooden bed that was so wide, it could fit three people. The villagers would come to him for advice and guidance, and the old man would listen to their problems while lying on his bed. He would stroke his beard thoughtfully and offer sage advice, which the villagers would always take to heart. When the old man passed away, the villagers built a shrine in his honor and placed his wide wooden bed inside as a symbol of his wisdom and compassion.
3. In a far-off land, there was a magical forest where the trees were as tall as mountains. At the heart of the forest stood a giant wooden bed, so wide that it could fit an entire village. Legend had it that whoever slept on the bed would be granted three wishes. Many people came from far and wide to try their luck, but few were granted their wishes. One day, a kind-hearted orphan stumbled upon the bed and made a simple wish: for a home and a family. To his surprise, his wish was granted, and he lived happily ever after with his new family on the edge of the magical forest.
\`
`;

export const multiCharacterTemplate = `Tell me about the word {{word}}.
Use simplified Chinese characters if possible.
What is its pronunciation in Mandarin?
What are its senses?
How common is it? Is it used in speech, writing, or both?
Give three to five example sentences.
Based on the meanings of the characters, explain why word has the meaning that it does.

Use this template as an example.
Use this exact format, with the specific fields as named, and include all of the information requested.
Except don't use "…" as examples, use real examples.
{{interests}}

\`
# Pronunciation
nǐ hǎo

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
