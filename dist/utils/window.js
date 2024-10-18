import { textHardWrap } from "./textWrap.js";
import { text } from "../theme.js";
// Function to draw a line of a specific length
const drawLine = (length, char = "─") => {
    return char.repeat(length);
};
const WIDTH = process.stdout.columns || 80; // Terminal width
const HEADER_TOP = "──────┬";
const HEADER_MID = "──────┴";
const HEADER_TEX = "      │";
const HEADER_BOT = "──────┴";
export const PAD_WIDTH = 6;
const WIDTH_TEXT = WIDTH - HEADER_TOP.length;
export const LINE_TOP = text.border(HEADER_TOP + drawLine(WIDTH_TEXT));
export const LINE_MID = text.border(HEADER_MID + drawLine(WIDTH_TEXT));
export const LINE_DIV = text.border(HEADER_TEX) + text.border(drawLine(WIDTH_TEXT, "-"));
export const LINE_TEX = text.border(HEADER_TEX) + " ";
export const LINE_BOT = text.border(HEADER_BOT + drawLine(WIDTH_TEXT));
export function getLines(content) {
    if (content == "") {
        return [""];
    }
    let result = [];
    // Adjust width considering the length of the prefix
    const availableWidth = WIDTH_TEXT - 2; // 3 is for padding and the "│" symbol
    const wrappedContent = textHardWrap(content, availableWidth);
    // let isHeader = true;
    for (let line of wrappedContent) {
        for (let r of line.lines) {
            result.push(r);
        }
    }
    return result;
}
