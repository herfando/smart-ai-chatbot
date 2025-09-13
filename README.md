<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjA0YjQ0YzM1NzIzYzlhYTI1MzNjOGUyM2QxZDUwZjVjNjk0ZjhiYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif" width="350"/>
</p>

<h1 align="center">
  <span style="background: linear-gradient(90deg, #06b6d4, #3178c6, #ff6ec7); -webkit-background-clip: text; color: transparent; font-weight: bold;">
    ⚡ React + TypeScript + Vite Starter
  </span>
</h1>

<p align="center">
  🚀 Minimal but powerful template to build **React apps** with **Vite**, **TypeScript**, **HMR**, and strong **ESLint** support.
</p>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/></a>
</p>

---

## ✨ Features
- ⚛️ **React + TypeScript** ready  
- ⚡ **Vite** for lightning-fast HMR & build times  
- 🟦 **ESLint** with type-aware rules for safer code  
- 🎨 Minimal setup, fully customizable  
- 🔧 Supports two official Vite plugins:  
  - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) → uses **Babel** for Fast Refresh  
  - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) → uses **SWC** for Fast Refresh  
- 📚 Optional React-specific lint plugins:  
  - [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)  
  - [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)  

---

## 🛠️ Expanding the ESLint configuration

For production apps, it’s recommended to enable **type-aware lint rules**:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Remove tseslint.configs.recommended and replace with these
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
