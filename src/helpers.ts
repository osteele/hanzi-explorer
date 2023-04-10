export function isPinyin(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  // Test for pinyin with tone numbers (1-5) or tone marks
  const re =
    /^(([bpmfdtnlgkhjqxrzcsyw]|[zcs]h)[aāàǎáeēèěéiīìǐíoōòǔóuūùûúüǘǚǜ]{1,2}[rng]?|[1-5]?)+$/i;
  // Test the string against the regular expressions
  return re.test(str);
}

export function isHanzi(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  // Test for Hanzi
  const re = /^[\u4E00-\u9FA5]+$/;
  return re.test(str);
}

export function getHanziCount(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  const re = /[\u4E00-\u9FA5]/g;
  // Count the number of Hanzi
  return str.match(re)?.length || 0;
}

export function terminateJSON(json: string) {
  try {
    JSON.parse(json);
    return json;
  } catch (e) {}
  const brackets: Record<string, string> = {
    "{": "}",
    "[": "]",
    '"': '"',
  };
  const stack: string[] = [];
  for (let i = json.length - 1; i >= 0; i--) {
    const c = json[i];
    if (stack[0] === c) {
      stack.shift();
    } else if (brackets[c]) {
      stack.unshift(brackets[c]);
    }
  }
  while (stack.length > 0) {
    json += stack.join("");
  }
  try {
    JSON.parse(json);
    return json;
  } catch (e) {
    return null;
  }
}
