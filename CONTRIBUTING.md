# Contributing to algorithms‑ui

Thank you for your interest in contributing! We welcome all kinds of improvements—from bug reports and documentation fixes to new algorithms and features. Please follow these guidelines to make the process smooth for everyone.

## 1. Code of Conduct  
This project adheres to the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## 2. How to File an Issue  
- Search existing issues to avoid duplicates.  
- Use a clear, descriptive title and provide steps to reproduce, expected vs. actual behavior, and environment details (OS, Node version, browser).

## 3. Development Setup  
```bash
git clone https://github.com/Zyoruk/algorithms-ui.git
cd algorithms-ui
npm install            # or yarn / pnpm
npm run dev
```

## 4. Branching & Pull Requests  
1. Fork the repo and create a branch:  
   ```bash
   git checkout -b feat/your-feature
   ```  
2. Commit using [Conventional Commits](https://www.conventionalcommits.org/):  
   ```
   feat(tree): add preorder traversal animation
   fix(ui): correct button alignment
   ```  
3. Push your branch and open a PR against `main`.  
4. Fill out the PR template, reference related issues, and explain your changes.  
5. Ensure all CI checks (lint, TypeScript, Tailwind) pass.

## 5. Testing  
- Add or update unit tests in the `src/app/algorithms` folder.  
- Run `npm test` (or your preferred test command) before submitting.

## 6. Code Style  
- Follow existing patterns (Next.js App Router, React Hooks).  
- Use Prettier/ESLint defaults (`npm run lint -- --fix`).  
- Keep functions small and focused; add JSDoc comments where helpful.

## 7. Reviews & Merging  
- Project maintainers will review your PR and may request changes.  
- Once approved and CI is green, your PR will be merged and celebrated!

Thank you for making **algorithms‑ui** better! 🎉  