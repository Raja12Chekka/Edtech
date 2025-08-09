# EdTech Platform Frontend

Next.js frontend for the EdTech Learning Platform with course browsing, enrollment, and professor course management.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **GraphQL Request** - API client
- **Zustand** - State management

## Quick Start

### Prerequisites
- Node.js 18+
- Backend server running

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:3000`

## Features

### Students
- Browse available courses
- View course details
- Enroll in courses
- Login with email

### Professors
- View all courses
- Edit course details (title, description, level)
- Manage assigned courses

## Pages

- `/` - Course listing homepage
- `/login` - User authentication
- `/courses/[id]` - Course details and enrollment/editing
- `/enrollment-confirmation` - Post-enrollment confirmation

## Authentication

Login with test accounts:
- `john.doe@example.com` (Student)
- `jane.smith@example.com` (Student)
- `alice.johnson@example.com` (Professor)

## Course Management

Professors see "Edit Course" button on courses they teach. Edit form includes:
- Course title
- Description
- Level (beginner/intermediate/advanced)

Changes save automatically and backend validates professor permissions.

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## API Integration

Connects to GraphQL backend at `http://localhost:4000/graphql`

Key queries:
- `GET_ALL_COURSES` - Homepage course listing
- `GET_COURSE_BY_ID` - Course details page
- `GET_USER_BY_EMAIL` - Login authentication

Key mutations:
- `ENROLL_IN_COURSE` - Student enrollment
- `UPDATE_COURSE` - Professor course editing