# React Enterprise Starter Kit

A production-ready, feature-rich starter template for building modern, scalable, and maintainable web applications with React. This repository provides a robust foundation featuring a clean, feature-driven architecture and a complete authentication system, allowing you to bypass boilerplate and focus directly on building your application's core features.

![Dark Mode](/docs/dash-dark.png)

---

## Features

This starter template comes packed with a modern tech stack and tooling, all configured to work seamlessly together.

| Category      | Fature                                                                            |
| ------------- | --------------------------------------------------------------------------------- |
| Framework     | **React 19** with modern features like Concurrent Rendering.                      |
| Build Tool    | **Vite** for an incredibly fast development experience and optimized builds.      |
| Testing       | **Vitest** for unit/UI tests & **Playwright** for E2E tests.                      |
| Styling       | **Tailwind CSS** with `tailwind-merge` and `clsx` for utility-first styling.      |
| UI Components | **Radix UI** & **Lucide Icons** for accessible, unstyled components.              |
| Routing       | **React Router** for declarative, client-side routing.                            |
| State         | **Zustand** for simple, scalable global state management.                         |
| Lint & Format | **ESLint** & **Prettier** configured with Husky and lint-staged for code quality. |
| Language      | **TypeScript** for type safety and improved developer experience.                 |
| Deployment    | **Docker** & **NGINX** configuration included for production-ready deployment.    |

---

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

- **Node.js**: `v22.x` or higher
- **bun**: `v1.2.x` or higher

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/shandysiswandi/react-app.git
cd react-app

# Configure Environment Variables
cp .env.example .env

# Install Dependencies
bun install

# Run the Development Server
bun run dev
```

The application will now be available at **http://localhost:5171**.

---

## Project Structure

This project follows a feature-driven architecture designed for scalability and maintainability. Instead of organizing files purely by type (e.g., all components in one folder), we group them by feature. This makes the codebase easier to navigate and scale as new features are added.

```bash
e2e/                     # End-to-end tests (Playwright)
src/
├── app/                 # Core application setup (routing, providers)
├── lib/                 # Shared libraries and utilities
│   ├── api/             # API clients and request logic
│   ├── constants/       # Application-wide constants
│   ├── stores/          # Global Zustand stores
│   └── utils/           # Utility/helper functions
├── modules/             # Feature-based modules
│   ├── auth/            # Authentication-related features
│   │   ├── data/        # Data fetching logic, API calls
│   │   ├── model/       # TypeScript types and interfaces
│   │   ├── service/     # Business logic and service functions
│   │   └── view/        # React components and pages
└── ui/                  # Shared UI components, layouts, and hooks
    ├── components/      # Generic UI components
    │   └── ui/          # Base UI primitives (buttons, inputs, etc.)
    ├── hooks/           # Custom React hooks
    ├── layouts/         # Layout components
    │   ├── auth/        # Layouts for authentication pages
    │   └── main/        # Main app layouts
    └── pages/           # Page-level components (if any)
```

## Testing

This project uses a comprehensive testing strategy to ensure code quality and application stability.

- **Unit Tests**(`tests/unit`): These tests use **Vitest** to verify individual functions and business logic in isolation. They are fast and focus on the smallest parts of the application.
- **UI Tests**(`tests/ui`): Also using **Vitest**, these tests focus on rendering React components and verifying their behavior and appearance without a full browser.
- **End-to-End (E2E) Tests**(`tests/e2e`): These tests use **Playwright** to simulate real user interactions in a browser, ensuring that entire features work correctly from start to finish.

### Running Tests using NPM

- `npm run test` or `bun run test`: Runs all Vitest (unit and UI) and Playwright E2E tests.
- `npm run test:ui` or `bun run test:ui`: Runs only the UI tests.
- `npm run test:unit` or `bun run test:unit`: Runs only the unit tests.
- `npm run test:e2e` or `bun run test:e2e`: Runs only Playwright E2E tests.

---

## Available Scripts

This project includes a set of npm scripts to streamline common development tasks:

- `npm run dev` or `bun run dev`: Starts the Vite development server with hot-reloading.
- `npm run build` or `bun run dev`: Compiles and bundles the application for production.
- `npm run start` or `bun run dev`: Serves the production build locally for testing.
- `npm run lint` or `bun run dev`: Lints the codebase for potential errors and style issues.
- `npm run format` or `bun run dev`: Formats all files with Prettier.

## Deployment

This project is configured for containerized deployment using Docker and NGINX.

1. Build the Docker Image:

   ```bash
    docker build -t react-app .
   ```

2. Run the Container:
   ```bash
    docker run --rm -it -p 3000:80 react-app
   ```

The application will be accessible at http://localhost:3000. The Dockerfile uses a multi-stage build to create a small, optimized production image.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find a bug, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
