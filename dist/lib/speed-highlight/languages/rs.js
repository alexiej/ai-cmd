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
        match: /\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g
    },
    {
        type: 'oper',
        match: /[/*+:?&|%^~=!,<>.^-]+/g
    },
    {
        type: 'class',
        match: /\b[A-Z][\w_]*\b/g
    },
    {
        type: 'func',
        match: /[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g
    }
];
