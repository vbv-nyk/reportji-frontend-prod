```markdown
# Reportji Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is designed to help users generate reports easily.

## Features

- **Report Generation:** Create reports by adding content through a user-friendly interface.
- **File Conversion:** Convert files from one format to another. (Currently links to an external service)
- **Authentication:** Google OAuth for user login.
- **Document Management:** Users can view and manage their generated documents.
- **Dynamic Report Editing:** Users can add, edit, delete and reorder chapters and elements within each chapter.
- **LaTeX Rendering:** Generates and displays reports in LaTeX format, with a live preview feature.
- **Drag and Drop:** Allows users to reorder elements using drag and drop functionality.

### Installation

1. Clone the repository:
   ```bash
    clone the repository
    cd reportji-frontend
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install


## Tech Stack

- **Framework:** Next.js 14.2.4
- **Styling:** Tailwind CSS
- **Data Fetching:** Apollo Client with GraphQL
- **Drag and Drop:** @hello-pangea/dnd
- **Code Editor:** react-ace (Ace Editor)
- **Authentication:** Google OAuth
- **Icons:** react-icons
- **Development:** TypeScript

### Environment Variables
The application uses the following environment variables:

- **`DEVELOPMENT`**: Set to `true` for development, `false` otherwise.
- **`BACKEND_PORT`**: The port where the backend server is running (default: `4000`).
- **`IP`**: The IP address of the backend server. Defaults to `localhost` in development and a Tailscale address otherwise.
- **`BACKEND_URL`**: The full URL of the backend server, constructed from `IP` and `BACKEND_PORT`.

These variables are defined in `/app/constants.tsx`.


## Project Structure

- **`/app`**: Contains the main application code.
  - **`/Components`**: Reusable UI components.
    - **`/Buttons`**: Button components with different styles.
    - **`/Images`**: Image components (e.g., logos).
  - **`/documents`**: Pages related to document management and report generation.
    - **`/reportgen/[id]`**: Dynamic route for report generation.
      - **`/Accordion`**: Accordion component for displaying and editing report elements.
      - **`/ViewPages`**: Components for viewing and managing pages.
      - `common.tsx`: Common components and functions for report generation.
      - `step1.tsx`: UI for entering chapter names.
      - `step2.tsx`: UI for adding and editing content.
      - `step3.tsx`: UI for rendering and editing the LaTeX report.
      - `types.tsx`: Enum for different views in the report generation process.
  - **`/choice`**: Page for choosing between report generation and file conversion.
  - **`/login`**: (Deprecated) Page for user login, now handled by backend Google OAuth.
  - **`/types`**: TypeScript types for elements and pages.
  - `constants.tsx`: Defines environment variables.
  - `globals.css`: Global CSS styles.
  - `layout.tsx`: Root layout for the application.
  - `page.tsx`: Home page.
- **`/public`**: Static assets (images, etc.).
