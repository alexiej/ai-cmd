import { textWrap } from "./textWrap.js";

// Function to draw a line of a specific length
const drawLine = (length: number, char: string = "─") => {
  return char.repeat(length);
};

export function window(header: string, text: string) {
  // Define the width of the content box
  const contentWidth = 50;

  // Wrap the text to fit within the content width
  const wrappedText = textWrap(text, contentWidth - 2);

  // Create the title bar
  const titleBar = `┌${drawLine(contentWidth, "─")}┐`;

  // Create the bottom border
  const bottomBorder = `└${drawLine(contentWidth, "─")}┘`;

  // Create the content lines, wrapping the text
  const contentLines = wrappedText
    .split("\n")
    .map((line) => `│ ${line.padEnd(contentWidth - 2)} │`)
    .join("\n");

  // Combine everything to form the window
  const windowContent = `${titleBar}\n${contentLines}\n${bottomBorder}`;

  // Output to the console
  return windowContent;
}
