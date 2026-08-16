# 💻 Developer Guidelines & Engineering Execution Standards
**Role Owner**: Engineering Lead & Development Team  
**Sync Target**: Tech Architect Specs $\rightarrow$ QA Testing  

---

## 🛠️ Code Structure & Best Practices

1. **Clean Architecture**: Separate UI components (`src/components`), data logic (`src/services`), and state management (`src/store`).
2. **Strict Linting & Formatting**: ESM modules, ES2022 standards. Zero console errors allowed in production builds.
3. **No Direct DOM Mutations**: Use modular component wrappers and clear DOM lifecycle event handling.
4. **Performance First**: Lazy load video assets (`preload="metadata"`), unmount off-screen video elements in the infinite feed to save browser memory.

---

## 🌿 Git Branching Strategy & Pull Request Rules

```
main (Production)
  └── staging (Pre-release testing)
        ├── feature/US-001-reel-feed
        ├── feature/US-002-trade-modal
        └── fix/BUG-104-video-mute-state
```

### PR Requirements Checklist:
- [ ] PR title references User Story ID (e.g. `feat(US-001): Implement vertical video reel feed`).
- [ ] Code passes syntax and lint validation (`npm run build` or `node verify_syntax.js`).
- [ ] Unit & Component tests included.
- [ ] Approved by Tech Architect or Senior Developer.
