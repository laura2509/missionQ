module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [
            'error',
            4
        ],
        'quotes': [
            'error',
            'single',
            { 'avoidEscape': true, 'allowTemplateLiterals': true }
        ],
        'max-len': [
            'error', 
            { 
                'code': 120, 
                'ignoreComments': true,
                'ignoreUrls': true           
            }
        ],
        'semi': [
            'error',
            'always'
        ],
        'eqeqeq': [
            'error', 
            'always'
        ],
        'no-console': 1,
        'keyword-spacing': [
            'error', 
            { 'before': true, 'after': true }
        ],
        'brace-style': [
            'error', 
            '1tbs'
        ],
    }
};
