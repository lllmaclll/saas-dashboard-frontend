// jest.setup.mjs
require('@testing-library/jest-dom');

// ```    **คำอธิบาย:**
// *   `jest.config.mjs`: บอก Jest ว่าจะทำงานร่วมกับ Next.js ได้อย่างไร และจะใช้ `jest-environment-jsdom` เพื่อจำลองสภาพแวดล้อมของเบราว์เซอร์
// *   `jest.setup.mjs`: import `jest-dom` เข้ามาเพื่อให้เราสามารถใช้ Matcher ที่ดีขึ้น เช่น `.toBeInTheDocument()`