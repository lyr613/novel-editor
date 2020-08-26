// 这个文件没用了

/* eslint-disable no-useless-escape */
export default {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',
    keywords: [],
    typeKeywords: [],
    operators: ['=', '>', '<', '==', '<=', '>=', '!=', '<>', '+', '-', '*', '/'],
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            // 关键字的搜索范围
            [
                /\S+/,
                {
                    cases: {
                        '@typeKeywords': 'keyword',
                        '@keywords': 'keyword',
                        '@default': 'identifier',
                    },
                },
            ],
            [/ee/, 'type.identifier'], // to show class names nicely
            // whitespace
            { include: '@whitespace' },
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            // @ annotations.
            // As an example, we emit a debugging log message on these tokens.
            // Note: message are supressed during the first load -- change some lines to see them.
            // eslint-disable-next-line no-useless-escape
            [/#\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            // non-teminated string
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
            // characters
            [/'[^\\']'/, 'string'],
            [/'/, 'string.invalid'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'],
            // nested comment
            ['\\*/', 'comment', '@pop'],
            [/[\/*]/, 'comment'],
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
    },
} as monaco.languages.IMonarchLanguage

const a: monaco.languages.IMonarchLanguage = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [
                /[a-z_$][\w$]*/,
                { cases: { '@typeKeywords': 'keyword', '@keywords': 'keyword', '@default': 'identifier' } },
            ],
            [/[A-Z][\w\$]*/, 'type.identifier'], // to show class names nicely

            // whitespace
            { include: '@whitespace' },

            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],

            // @ annotations.
            // As an example, we emit a debugging log message on these tokens.
            // Note: message are supressed during the first load -- change some lines to see them.
            [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],

            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],

            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'], // non-teminated string
            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid'],
        ],

        comment: [
            [/[^\/*]+/, 'comment'],
            [/\/\*/, 'comment', '@push'], // nested comment
            [/[\/*]/, 'comment'],
        ],

        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],

        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment'],
        ],
    },
}
