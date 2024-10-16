export default [
    {
        match: /^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g,
        sub: 'todo'
    },
    {
        expand: 'str'
    },
    {
        type: 'kwd',
        match: /\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g
    },
    {
        type: 'bool',
        match: /\b(true|false|nil)\b/g
    },
    {
        type: 'oper',
        match: /[+*/%^#=~<>:,.-]+/g
    },
    {
        expand: 'num'
    },
    {
        type: 'func',
        match: /[a-z_]+(?=\s*[({])/g
    }
];
