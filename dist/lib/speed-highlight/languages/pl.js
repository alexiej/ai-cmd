export default [
    {
        match: /#.*/g,
        sub: 'todo'
    },
    {
        type: 'str',
        match: /(["'])(\\[^]|(?!\1)[^])*\1?/g
    },
    {
        expand: 'num'
    },
    {
        type: 'kwd',
        match: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g
    },
    {
        type: 'oper',
        match: /[-+*/%~!&<>|=?,]+/g
    },
    {
        type: 'func',
        match: /[a-z_]+(?=\s*\()/g
    }
];
