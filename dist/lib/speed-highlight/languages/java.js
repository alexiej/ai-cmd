export default [
    {
        match: /\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,
        sub: 'todo'
    },
    {
        expand: 'str'
    },
    {
        expand: 'num'
    },
    {
        type: 'kwd',
        match: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g
    },
    {
        type: 'oper',
        match: /[/*+:?&|%^~=!,<>.^-]+/g
    },
    {
        type: 'func',
        match: /[a-zA-Z_][\w_]*(?=\s*\()/g
    },
    {
        type: 'class',
        match: /\b[A-Z][\w_]*\b/g
    }
];
