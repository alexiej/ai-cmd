export default [
    {
        match: /#.*/g,
        sub: 'todo'
    },
    {
        match: /("""|''')(\\[^]|(?!\1)[^])*\1?/g,
        sub: 'todo'
    },
    {
        type: 'str',
        match: /f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi,
        sub: [
            {
                type: 'var',
                match: /{[^{}]*}/g,
                sub: [
                    {
                        match: /(?!^{)[^]*(?=}$)/g,
                        sub: 'py'
                    }
                ]
            }
        ]
    },
    {
        expand: 'str'
    },
    {
        type: 'kwd',
        match: /\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g
    },
    {
        type: 'bool',
        match: /\b(False|True|None)\b/g
    },
    {
        expand: 'num'
    },
    {
        type: 'func',
        match: /[a-z_]+(?=\s*\()/g
    },
    {
        type: 'oper',
        match: /[-/*+<>,=!&|^%]+/g
    },
    {
        type: 'class',
        match: /\b[A-Z][\w_]*\b/g
    }
];
