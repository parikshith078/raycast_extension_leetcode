import { Form, ActionPanel, Action, showToast, AI } from "@raycast/api";
import { useState } from "react";
import { createFile, extractQuestionName, getPrompt } from "./lib/util";
import { PROMPT } from "./lib/constants";

export type Values = {
  link: string;
  code: string;
};

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: Values) {
    console.log(values);
    const fileName = extractQuestionName(values.link);
    const prompt = getPrompt(PROMPT, values.code, values.link);
    console.log("prompt:", prompt);
    console.log("fileName:", fileName);
    setIsLoading(true);
    const response = await AI.ask(prompt);
    console.log("response:", response);
    createFile(fileName, response);
    setIsLoading(false);

    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  const [link, setLink] = useState<string>("");
  const [starterCode, setStarterCode] = useState<string>("");

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Create question file: " />
      <Form.TextField value={link} onChange={setLink} id="link" title="question link" placeholder="Enter link" />
      <Form.TextArea
        id="code"
        title="starter code"
        value={starterCode}
        onChange={setStarterCode}
        placeholder="Enter starter coder"
      />
    </Form>
  );
}
