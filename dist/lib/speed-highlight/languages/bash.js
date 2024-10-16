let variable = {
    type: 'var',
    match: /\$\w+|\${[^}]*}|\$\([^)]*\)/g
};
export default [
    {
        sub: 'todo',
        match: /#.*/g
    },
    {
        type: 'str',
        match: /(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,
        sub: [variable]
    },
    {
        type: 'kwd',
        match: /-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)\b/g
    },
    {
        expand: 'num'
    },
    {
        type: 'func',
        match: /\b(set|alias|bg|bind|builtin|caller|command|compgen|complete|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|read|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|unset)\b/g
    },
    {
        type: 'bool',
        match: /\b(true|false)\b/g
    },
    {
        type: 'func',
        match: /[a-z_]+(?=\s*\()/g
    },
    {
        type: 'oper',
        match: /[=(){}<>+*/!?~^-]+/g
    },
    {
        type: 'var',
        match: /\w+(?=\s*=)/g
    },
    variable
];
