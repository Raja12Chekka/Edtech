# EdTech Platform Backend

GraphQL API server for the EdTech Learning Platform built with Apollo Server, Prisma, and PostgreSQL.

## Tech Stack

- **Apollo Server** - GraphQL server
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **TypeScript** - Type safety
- **Node.js** - Runtime

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+

### Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Configure database URL in .env
DATABASE_URL="postgresql://username:password@localhost:5432/edtech_db"

# Setup database
npx prisma generate
npx prisma migrate dev

# Seed database
node seed.js

# Start server
npm run dev
```

Server runs at `http://localhost:4000/graphql`

## API Endpoints

### Queries

```graphql
# Get all courses
courses: [Course]

# Get course by ID
course(id: ID!): Course

# Get all users
users: [User]

# Get user by ID
user(id: ID!): User

# Get user by email (for login)
userByEmail(email: String!): User
```

### Mutations

```graphql
# Enroll user in course
enroll(userId: ID!, courseId: ID!): Enrollment

# Update course (professors only)
updateCourse(id: ID!, userId: ID!, data: UpdateCourseInput!): Course
```

## Data Models

### User
```typescript
{
  id: string
  name: string
  email: string
  role: string // "student" | "professor"
  enrollments: Enrollment[]
}
```

### Course
```typescript
{
  id: string
  title: string
  description: string
  level: string // "beginner" | "intermediate" | "advanced"
  enrollments: Enrollment[]
}
```

### Enrollment
```typescript
{
  id: string
  role: string // "student" | "professor"
  user: User
  course: Course
}
```

## Test Data

After seeding, these accounts are available:

**Students:**
- john.doe@example.com (John Doe)
- jane.smith@example.com (Jane Smith)

**Professor:**
- alice.johnson@example.com (Dr. Alice Johnson)

## Development

```bash
# Start development server
npm run dev

# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Re-seed data
node seed.js
```

## Permissions

- **Students**: Can enroll in courses
- **Professors**: Can edit courses they're assigned to teach

Course editing requires professor role and assignment to the specific course.