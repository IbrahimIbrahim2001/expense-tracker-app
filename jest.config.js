module.exports = {
    preset: 'jest-expo',
    setupFiles: [
        require.resolve('jest-expo/src/preset/setup.js'),
        '<rootDir>/jest-setup.js',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};
