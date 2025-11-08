# Contributing to Gura E-commerce Platform

First off, thank you for considering contributing to Gura! It's people like you that make Gura such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@gura.com.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the coding style** of the project (see Code Style Guide below)
3. **Write clear commit messages** (see Commit Message Guidelines below)
4. **Include tests** if you're adding functionality
5. **Update documentation** as needed
6. **Ensure the test suite passes** (`npm test`)
7. **Make sure your code lints** (`npm run lint`)

## Development Process

### Setting Up Your Development Environment

```sh
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/gura.git
cd gura

# Add upstream remote
git remote add upstream https://github.com/gura/gura.git

# Install dependencies
npm install

# Create a .env.local file with your Supabase credentials
cp .env.example .env.local

# Start the development server
npm run dev
```

### Creating a Branch

```sh
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Or for a bugfix
git checkout -b fix/your-bug-fix-name
```

### Making Changes

1. **Make your changes** in your feature branch
2. **Test your changes** thoroughly
3. **Run the linter**: `npm run lint`
4. **Run tests**: `npm test`
5. **Format your code**: `npm run format`

### Committing Your Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect the code meaning (white-space, formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**

```sh
git commit -m "feat: add product filtering by price range"
git commit -m "fix: resolve cart total calculation error"
git commit -m "docs: update authentication flow diagram"
git commit -m "refactor: simplify address validation logic"
```

### Submitting a Pull Request

1. **Push your changes** to your fork:
   ```sh
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub

3. **Fill out the PR template** completely

4. **Link any relevant issues** (e.g., "Closes #123")

5. **Wait for review** - a maintainer will review your PR

6. **Address feedback** - make any requested changes

7. **Get merged!** - once approved, your PR will be merged

## Code Style Guide

### TypeScript/React

- **Use TypeScript** for all new code
- **Use functional components** with hooks
- **Follow React best practices**:
  - Keep components small and focused
  - Use custom hooks for reusable logic
  - Prefer composition over inheritance
- **Use named exports** for components
- **Proper typing**: Avoid `any`, use proper interfaces/types

**Example:**

```typescript
// ✅ Good
interface UserProfileProps {
  userId: string;
  onUpdate: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  // Component implementation
};

// ❌ Bad
export const UserProfile = ({ userId, onUpdate }: any) => {
  // Component implementation
};
```

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utils**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

### Component Organization

```typescript
// 1. Imports (grouped: React, third-party, local)
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export const Component: React.FC<ComponentProps> = (props) => {
  // 3a. Hooks
  const { user } = useAuth();
  
  // 3b. State
  const [count, setCount] = useState(0);
  
  // 3c. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 3d. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 3e. Render helpers
  const renderContent = () => {
    // ...
  };
  
  // 3f. Return JSX
  return (
    <div>
      {/* ... */}
    </div>
  );
};
```

### CSS/Styling

- **Use Tailwind CSS** utility classes
- **Use semantic design tokens** from `index.css`
- **Avoid inline styles** unless absolutely necessary
- **Use the design system** - don't hardcode colors

```tsx
// ✅ Good - Using semantic tokens
<Button className="bg-primary text-primary-foreground">
  Click me
</Button>

// ❌ Bad - Hardcoded colors
<Button className="bg-blue-500 text-white">
  Click me
</Button>
```

### Testing

- **Write tests** for new features
- **Update tests** when modifying existing features
- **Follow the AAA pattern**: Arrange, Act, Assert

```typescript
describe('UserProfile', () => {
  it('should display user information', () => {
    // Arrange
    const user = { name: 'John Doe', email: 'john@example.com' };
    
    // Act
    render(<UserProfile user={user} />);
    
    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## Database Changes

When making database changes:

1. **Create a migration** using Supabase
2. **Include RLS policies** for new tables
3. **Update TypeScript types** accordingly
4. **Document the schema changes** in `docs/DATABASE.md`

## Documentation

- **Update documentation** when adding/changing features
- **Use clear, concise language**
- **Include code examples** where helpful
- **Add diagrams** for complex flows (use Mermaid)

## Review Process

All submissions require review. We use GitHub pull requests for this purpose:

1. **Automated checks** must pass (linting, tests, build)
2. **Code review** by at least one maintainer
3. **Testing** on different browsers/devices if UI changes
4. **Documentation review** if docs were updated

## Community

- **Be respectful** and constructive
- **Help others** when you can
- **Ask questions** when you're unsure
- **Share knowledge** and learn together

## Getting Help

- **Documentation**: Check the [docs/](docs/) folder first
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Search existing issues before creating new ones
- **Email**: dev@gura.com for private inquiries

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- Our website (coming soon)

Thank you for contributing to Gura! 🎉
