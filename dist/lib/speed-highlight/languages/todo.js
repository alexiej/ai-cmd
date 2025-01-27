export default [
    {
        type: 'err',
        match: /\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g
    },
    {
        type: 'class',
        match: /\bIDEA\b/g
    },
    {
        type: 'insert',
        match: /\b(CHANGED|FIX|CHANGE)\b/g
    },
    {
        type: 'oper',
        match: /\bQUESTION\b/g
    }
];
export let type = 'cmnt';
