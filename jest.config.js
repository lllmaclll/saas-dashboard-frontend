// jest.config.js  <-- เปลี่ยนชื่อเป็น .js
const nextJest = require('next/jest'); // <--- เปลี่ยนเป็น require

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // <--- อัปเดตชื่อไฟล์
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
 
module.exports = createJestConfig(config); // <--- เปลี่ยนเป็น module.exports