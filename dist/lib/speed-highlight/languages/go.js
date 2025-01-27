export default [
    {
        match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
        sub: "todo",
    },
    {
        expand: "str",
    },
    {
        expand: "num",
    },
    {
        type: "kwd",
        match: /\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,
    },
    {
        type: "func",
        match: /[a-zA-Z_][\w_]*(?=\s*\()/g,
    },
    {
        type: "class",
        match: /\b[A-Z][\w_]*\b/g,
    },
    {
        type: "oper",
        match: /[+\-*/%&|^~=!<>.^-]+/g,
    },
];
