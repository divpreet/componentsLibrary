module.exports = {
    collectCoverageFrom: ['./src/test/*.{js,jsx,ts,tsx}', '!./src/**/*.{js,jsx,ts,tsx}'],
    modulePathIgnorePatterns: ['<rootDir>/build/'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: ['<rootDir>/src/test/**.spec.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.(css)$': '<rootDir>/__mocks__/fileTransformer.js',
        '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileTransformer.js'
    }
};
