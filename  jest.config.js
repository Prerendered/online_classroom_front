module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
