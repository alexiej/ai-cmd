export default [
    {
        match: /#.*/g,
        sub: 'todo'
    },
    {
        type: 'str',
        match: /("""|''')((?!\1)[^]|\\[^])*\1?/g
    },
    {
        expand: 'str'
    },
    {
        type: 'section',
        match: /^\[.+\]\s*$/gm
    },
    {
        type: 'num',
        match: /\b(inf|nan)\b|\d[\d:ZT.-]*/g
    },
    {
        expand: 'num'
    },
    {
        type: 'bool',
        match: /\b(true|false)\b/g
    },
    {
        type: 'oper',
        match: /[+,.=-]/g
    },
    {
        type: 'var',
        match: /\w+(?= \=)/g
    }
];
