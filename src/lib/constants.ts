import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  prompt: string;
  location: string;
}

const preferences = getPreferenceValues<Preferences>();

export const PROMPT = preferences.prompt;
export const LOCAL_PATH = preferences.location;

// export const PROMPT =
//   "Here's the starter code [code] for a LeetCode problem available at this link: [link]. I need the code, including the necessary imports and test inputs, to solve the question locally. Don't give me the solution. I want to solve it myself (mention 'pass' in the solution function). Only return the code, nothing else.";
//
// export const LOCAL_PATH = "/Users/parikshith/Craft/dsa/";
