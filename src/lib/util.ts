import { writeFile } from "fs";
import { LOCAL_PATH } from "./constants";

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

export function createFile(fileName: string, code: string) {
  const file = `${LOCAL_PATH}/${fileName}`;
  console.log("file:", file);
  writeFile(file, code, "utf8", (err) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log(`File '${fileName}' created and data written successfully.`);
    }
  });
}

export function getPrompt(prompt: string, code: string, link: string): string {
  const codePlaceholder = "```code```";
  const updatedPrompt = prompt.replace("[code]", codePlaceholder).replace("[link]", link);
  return updatedPrompt.replace(codePlaceholder, `\n\`\`\`python\n${code}\n\`\`\`\n`);
}
