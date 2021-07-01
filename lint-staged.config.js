module.exports = {
    '**/*.{js,jsx,ts,tsx,json}': [
        'eslint --ext .js,.jsx,.ts,.tsx --format=pretty --fix',
        'prettier --write',
        'git add',
    ],
    '**/*.{md}': ['markdownlint --fix', 'prettier --write', 'git add'],
};
