# Contributing to Esypto

Thank you for your interest in contributing to Esypto! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Git
- Basic knowledge of Django
- Familiarity with HTML, CSS, and JavaScript

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/esypto.git
   cd esypto
   ```

2. **Set up Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Database**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

## 📝 Development Guidelines

### Code Style
- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused
- Use type hints where appropriate

### HTML/CSS Guidelines
- Use semantic HTML elements
- Follow BEM methodology for CSS classes
- Ensure responsive design (mobile-first)
- Maintain accessibility standards (WCAG 2.1 AA)
- Use CSS custom properties for theming

### JavaScript Guidelines
- Use modern ES6+ syntax
- Add comments for complex logic
- Ensure cross-browser compatibility
- Follow progressive enhancement principles

### Django Best Practices
- Use Django's built-in features when possible
- Follow Django's naming conventions
- Write secure code (avoid SQL injection, XSS, etc.)
- Use Django's form validation
- Implement proper error handling

## 🧪 Testing

### Running Tests
```bash
python manage.py test
```

### Writing Tests
- Write tests for new features
- Include both positive and negative test cases
- Test edge cases and error conditions
- Use Django's TestCase class
- Mock external dependencies

### Test Coverage
Aim for high test coverage, especially for:
- Models and their methods
- Views and their logic
- Forms and validation
- Custom template tags and filters

## 🎨 Design System

### Color Palette
- Primary: Forest Green (#22c55e)
- Secondary: Dark Green (#16a34a)
- Accent: Emerald (#10b981)
- Use CSS custom properties for colors

### Typography
- Font: Inter (Google Fonts)
- Use relative units (rem, em)
- Maintain proper contrast ratios

### Components
- Follow the existing glassmorphism design
- Ensure components work in both light and dark themes
- Make components responsive and accessible

## 🔄 Contribution Workflow

### 1. Create an Issue
Before starting work, create an issue describing:
- The problem or feature request
- Proposed solution
- Any relevant context or screenshots

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes
- Write clean, well-documented code
- Follow the style guidelines
- Add tests for new functionality
- Update documentation if needed

### 4. Test Your Changes
```bash
python manage.py test
python manage.py check
python manage.py collectstatic --noinput
```

### 5. Commit Changes
Use semantic commit messages:
```bash
git commit -m "feat: add photo gallery navigation"
git commit -m "fix: resolve dark mode navbar issue"
git commit -m "docs: update installation instructions"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:
- Clear title and description
- Reference to related issues
- Screenshots for UI changes
- Test results

## 📋 Pull Request Guidelines

### PR Title Format
- `feat: description` - New features
- `fix: description` - Bug fixes
- `docs: description` - Documentation changes
- `style: description` - Code style changes
- `refactor: description` - Code refactoring
- `test: description` - Test additions/changes

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Bug Reports

When reporting bugs, include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Python version)
- Screenshots or error messages
- Relevant code snippets

## 💡 Feature Requests

For feature requests, provide:
- Clear description of the feature
- Use case and benefits
- Proposed implementation approach
- Any relevant mockups or examples

## 📚 Documentation

### Types of Documentation
- Code comments and docstrings
- README updates
- API documentation
- User guides
- Developer guides

### Documentation Standards
- Use clear, concise language
- Include code examples
- Keep documentation up-to-date
- Use proper markdown formatting

## 🏷️ Release Process

### Version Numbering
We follow Semantic Versioning (SemVer):
- MAJOR.MINOR.PATCH
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number bumped
- [ ] Changelog updated
- [ ] Security check completed
- [ ] Performance testing done

## 🤝 Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on the issue, not the person
- Help others learn and grow

### Communication
- Use clear, professional language
- Be patient with questions
- Provide helpful feedback
- Acknowledge contributions

## 🆘 Getting Help

### Resources
- [Django Documentation](https://docs.djangoproject.com/)
- [Project Issues](https://github.com/yourusername/esypto/issues)
- [Project Discussions](https://github.com/yourusername/esypto/discussions)

### Contact
- Create an issue for bugs or features
- Start a discussion for questions
- Tag maintainers for urgent issues

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Esypto! 🚀