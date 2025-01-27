export default [
    {
        match: /^\s*#.*/gm,
        sub: 'todo'
    },
    {
        expand: 'str'
    },
    {
        type: 'oper',
        match: /[${}()]+/g
    },
    {
        type: 'class',
        match: /.PHONY:/gm
    },
    {
        type: 'section',
        match: /^[\w.]+:/gm
    },
    {
        type: 'kwd',
        match: /\b(ifneq|endif)\b/g
    },
    {
        expand: 'num'
    },
    {
        type: 'var',
        match: /[A-Z_]+(?=\s*=)/g
    },
    {
        match: /^.*$/gm,
        sub: 'bash'
    }
];
