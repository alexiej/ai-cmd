export default [
    {
        match: /\/\*((?!\*\/)[^])*(\*\/)?/g,
        sub: 'todo'
    },
    {
        expand: 'str'
    },
    {
        type: 'kwd',
        match: /@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g
    },
    {
        type: 'var',
        match: /\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g
    },
    {
        type: 'func',
        match: /#[\w-]+(?=[^{}]*{)/g
    },
    {
        type: 'num',
        match: /#[\da-f]{3,8}/g
    },
    {
        type: 'num',
        match: /\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,
        sub: [
            {
                type: 'var',
                match: /[a-z]+|%/g
            }
        ]
    },
    {
        match: /url\([^)]*\)/g,
        sub: [
            {
                type: 'func',
                match: /url(?=\()/g
            },
            {
                type: 'str',
                match: /[^()]+/g
            }
        ]
    },
    {
        type: 'func',
        match: /\b[a-zA-Z]\w*(?=\s*\()/g
    },
    {
        type: 'num',
        match: /\b[a-z-]+\b/g
    }
];
