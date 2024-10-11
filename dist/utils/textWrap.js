export function textWrap(text, maxWidth = 70) {
    const words = text.split(" ");
    let currentLine = "";
    let result = "";
    words.forEach((word) => {
        // Check if adding the next word exceeds the maxWidth
        if ((currentLine + word).length > maxWidth) {
            result += currentLine.trim() + "\n"; // Add the line to the result
            currentLine = word + " "; // Start a new line
        }
        else {
            currentLine += word + " "; // Add word to the current line
        }
    });
    result += currentLine.trim(); // Add the last line to the result
    return result;
}
