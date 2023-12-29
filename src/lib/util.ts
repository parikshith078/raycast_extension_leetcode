export function extractQuestionName(link: string): string {
  const questionPath = link.split("/").filter(Boolean);
  const questionName = questionPath[questionPath.length - 1];
  const fileName = questionName.replace(/-/g, "_") + ".py";
  return fileName;
}

export function extractCode(text: string): string {
  const codeStartIndex = text.indexOf("```python") + 10;
  const codeEndIndex = text.lastIndexOf("```");

  if (codeStartIndex === -1 || codeEndIndex === -1) {
    throw new Error("Invalid code format.");
  }

  return text.slice(codeStartIndex, codeEndIndex).trim();
}

export function createFile(fileName: string, code: string) { }

export function getPrompt(prompt: string, code: string, link: string): string {
  const codePlaceholder = "```code```";
  const updatedPrompt = prompt.replace("[code]", codePlaceholder).replace("[link]", link);
  return updatedPrompt.replace(codePlaceholder, `\n\`\`\`python\n${code}\n\`\`\`\n`);
}
