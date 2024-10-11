import chalk from "chalk";
import boxen from "boxen";
const YELLOW = "#F7D154"; // A warm, golden yellow
const GREEN = "#34D399"; // A soft, vibrant green (similar to tailwind's emerald)
const BLUE = "#3B82F6"; // A rich, modern blue (similar to tailwind's blue)
const ORANGE = "#ffb142"; // Orange for warnings
const RED = "#ff5252"; // Red for errors
const GRAY = "#d1ccc0"; // Red for errors
// Define color constants
const TEXT_COLOR = "#FFFFFF"; // Light blue for headers
const HEADER_COLOR = "#34ace0"; // Light blue for headers
const SUCCESS_COLOR = "#33d9b2"; // Greenish for success messages
const WARNING_COLOR = "#ffb142"; // Orange for warnings
const ERROR_COLOR = "#ff5252"; // Red for errors
const INFO_COLOR = "#706fd3"; // Purple for informational messages
const HIGHLIGHT_COLOR = "#f7f1e3"; // Off-white for highlights
const DIM_COLOR = "#d1ccc0"; // Dim color for less important text
const BACKGROUND_COLOR = "#2f3542"; // Dark background for emphasis
// Define theme colors using hex codes
export const text = {
    white: chalk.hex(TEXT_COLOR),
    yellow: chalk.hex(YELLOW),
    green: chalk.hex(GREEN),
    blue: chalk.hex(BLUE),
    orange: chalk.hex(ORANGE),
    red: chalk.hex(RED),
    gray: chalk.hex(GRAY),
    header: chalk.hex(HEADER_COLOR),
    success: chalk.hex(SUCCESS_COLOR),
    warning: chalk.hex(WARNING_COLOR),
    error: chalk.hex(ERROR_COLOR),
    info: chalk.hex(INFO_COLOR),
    highlight: chalk.hex(HIGHLIGHT_COLOR),
    dim: chalk.hex(DIM_COLOR),
    background: chalk.bgHex(BACKGROUND_COLOR),
};
export const window = {
    message: (text) => boxen(chalk.hex(TEXT_COLOR)(text), {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        align: "center",
        borderColor: HEADER_COLOR, // Light blue border for header
    }),
};
