export function splitMarkdownSections(markdown: string) {
  const sectionRegex = /^#{1,6}\s+(.+)$/gm; // match 1-6 # followed by at least one space and capture group
  const sections = [];
  let match;

  while ((match = sectionRegex.exec(markdown)) !== null) {
    const title = match[1];
    const startIndex = match.index + match[0].length;
    const endIndex = getNextSectionIndex(
      startIndex,
      sectionRegex.lastIndex,
      markdown
    );
    const content = markdown.slice(startIndex, endIndex).trim();
    sections.push({ title, content });
  }

  return sections;

  function getNextSectionIndex(
    startIndex: number,
    lastIndex: number,
    markdown: string
  ) {
    const nextMatch = new RegExp(/#{1,6}\s+/gm).exec(markdown.slice(lastIndex));
    return nextMatch ? lastIndex + nextMatch.index : markdown.length;
  }
}

export function isOrderedList(markdown: string) {
  return /\d+\.\s+\S+/.test(markdown.trim());
}

export function isUnorderedList(markdown: string) {
  return /^-\s+\S+/.test(markdown.trim());
}

export function getMarkdownListItems(markdown: string) {
  const itemRegex = /^(-|\d+\.)\s+(.+)$/gm; // match dash or number followed by dot and space, and capture group
  const matches = markdown.match(itemRegex);
  const items = matches
    ? matches.map((match) => match.replace(itemRegex, "$2").trim())
    : [];
  return items;
}
