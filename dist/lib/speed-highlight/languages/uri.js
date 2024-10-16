export default [
    {
        match: /^#.*/gm,
        sub: 'todo'
    },
    {
        type: 'class',
        match: /^\w+(?=:?)/gm
    },
    {
        type: 'num',
        match: /:\d+/g
    },
    {
        type: 'oper',
        match: /[:/&?]|\w+=/g
    },
    {
        type: 'func',
        match: /[.\w]+@|#[\w]+$/gm
    },
    {
        type: 'var',
        match: /\w+\.\w+(\.\w+)*/g
    }
];
