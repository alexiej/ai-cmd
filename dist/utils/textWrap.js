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
export function textHardWrap(text, maxWidth = 70) {
    // Initialize the result array that will hold the line numbers and wrapped lines
    const result = [];
    // Split the input text into lines by newlines
    const lines = text.split("\n");
    // Iterate through each line
    lines.forEach((line, index) => {
        const wrappedLines = [];
        // Loop through the line and slice it into segments of maxWidth
        for (let i = 0; i < line.length; i += maxWidth) {
            wrappedLines.push(line.slice(i, i + maxWidth));
        }
        // Push the result as an object with the line number and the list of wrapped lines
        result.push({ line: index + 1, lines: wrappedLines });
    });
    return result;
}
