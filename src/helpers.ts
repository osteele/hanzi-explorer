export function isPinyin(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  // Test for pinyin with tone numbers (1-5)
  var re1 = /^[a-zA-Z\u0100-\uFFFF]+[1-5]?$/;
  // Test for pinyin with tone marks
  var re2 = /^[a-zA-Z\u0100-\uFFFF]+[\u0300-\u0304\u0306-\u030C]?$/;
  // Test the string against the regular expressions
  return re1.test(str) || re2.test(str);
}

export function isHanzi(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  // Test for Hanzi
  return /^[\u4E00-\u9FA5]+$/.test(str);
}

export function getHanziCount(str: string) {
  // Remove any spaces from the string
  str = str.replace(/\s/g, "");
  console.log("str", str);
  // Count the number of Hanzi
  return str.match(/[\u4E00-\u9FA5]/g)?.length || 0;
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
