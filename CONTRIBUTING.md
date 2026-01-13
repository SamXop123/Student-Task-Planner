# Contributing to Student Task Planner

First off, thank you for considering contributing to Student Task Planner! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected to see**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List examples of how it would work**

### Pull Requests

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test your changes thoroughly**
5. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
6. **Push to the branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/student-task-planner.git
   cd student-task-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```

3. Set up environment variables (see QUICKSTART.md)

4. Run the development servers:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

## Coding Guidelines

### JavaScript/React Style

- Use ES6+ features
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### File Structure

- Place React components in `src/components/`
- Place pages in `src/pages/`
- Place API functions in `src/services/`
- Place backend routes in `server/routes/`
- Place controllers in `server/controllers/`

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Examples:
```
Add user profile page
Fix task deletion bug (#123)
Update README with deployment instructions
Refactor authentication middleware
```

## Testing

Before submitting a PR:

1. **Test all features manually**
2. **Ensure no console errors**
3. **Test on multiple browsers** (Chrome, Firefox, Safari)
4. **Test responsive design**
5. **Verify backend API changes work correctly**

## Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be celebrated! 🎉

## Areas That Need Help

- [ ] Unit and integration tests
- [ ] Accessibility improvements
- [ ] Dark mode implementation
- [ ] Mobile app (React Native)
- [ ] Additional task features (tags, categories)
- [ ] Notification system
- [ ] Performance optimizations
- [ ] Documentation improvements

## Questions?

Feel free to open an issue with the "question" label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Student Task Planner better! ❤️**

