const col = {
    // Dark red for deleted, err, and var
    red: "\x1b[38;2;224;108;117m", // #e06c75
    // Purple/magenta for section, oper, and kwd
    magenta: "\x1b[38;2;198;120;221m", // #c678dd
    // Yellowish for class
    yellow: "\x1b[38;2;229;192;123m", // #e5c07b
    // Gray for numbers and comments
    gray: "\x1b[38;2;118;131;154m", // #76839a
    // Green for insert
    green: "\x1b[38;2;152;195;121m", // #98c379
    // Cyan for types
    cyan: "\x1b[38;2;86;182;194m", // #56b6c2
    // Orange for numbers and booleans
    orange: "\x1b[38;2;209;154;102m", // #d19a66
    // Blue for strings and functions
    blue: "\x1b[38;2;97;175;239m", // #61afef
    // Light blue for the ::before pseudoclass
    lightBlue: "\x1b[38;2;111;154;255m", // #6f9aff
    // White for the general text color
    white: "\x1b[38;2;230;230;230m", // #ffffff
    // Dark background for the general background
    backgroundDark: "\x1b[48;2;22;27;34m", // #161b22
};
export default {
    default: col.white,
    // Red for deleted, err, and var
    deleted: col.red, // #e06c75
    err: col.red, // #e06c75
    var: col.red, // #e06c75
    // Magenta for section, oper, and kwd (keywords)
    section: col.magenta, // #c678dd
    oper: col.magenta, // #c678dd
    kwd: col.magenta, // #c678dd
    // Yellow for class
    class: col.yellow, // #e5c07b
    // Gray for comments and numbers
    cmnt: col.gray, // #76839a
    numbers: col.gray, // #76839a
    // Green for insert
    insert: col.green, // #98c379
    // Cyan for type and boolean
    type: col.cyan, // #56b6c2
    bool: col.cyan, // #56b6c2
    // Orange for numbers and booleans
    num: col.orange, // #d19a66
    // Blue for strings and functions
    func: col.blue, // #61afef
    str: col.green, // #98c379
};
