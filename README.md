# EdTech Learning Platform

A modern, full-stack EdTech platform built with Next.js, GraphQL, and PostgreSQL. This platform enables students to enroll in courses and professors to manage their course content.

## 🚀 Features

### For Students
- **Course Discovery**: Browse available courses with detailed information
- **Course Enrollment**: Enroll in courses with instant confirmation
- **User Authentication**: Secure login system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Professors
- **Course Management**: Edit course details including title, description, and difficulty level
- **Permission-Based Access**: Only professors assigned to a course can edit it
- **Real-time Updates**: Changes are reflected immediately across the platform

### Technical Features
- **GraphQL API**: Efficient data fetching with type-safe queries
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Modern UI**: Beautiful, accessible interface built with Tailwind CSS
- **Database Integration**: PostgreSQL with Prisma ORM for reliable data management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **GraphQL Request** - GraphQL client for data fetching
- **Zustand** - Lightweight state management

### Backend
- **Node.js** - JavaScript runtime
- **Apollo Server** - GraphQL server implementation
- **TypeScript** - Type-safe server development
- **Prisma** - Next-generation ORM for database management
- **PostgreSQL** - Robust relational database

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd EdTech-Learning-Platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Edit `backend/.env` with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/edtech_db"
PORT=4000
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
node seed.js
```

### 5. Start the Backend Server

```bash
# Start the GraphQL server
npm run dev
```

The backend server will be running at `http://localhost:4000/graphql`

### 6. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (if needed)
cp .env.local.example .env.local
```

### 7. Configure Frontend Environment

Edit `frontend/.env.local` (if you need to override defaults):

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### 8. Start the Frontend Development Server

```bash
# Start the Next.js development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

## 🧪 Test Accounts

The database seed includes these test accounts for immediate testing:

### Students
- **Email**: `john.doe@example.com`
- **Name**: John Doe
- **Role**: Student

- **Email**: `jane.smith@example.com`
- **Name**: Jane Smith
- **Role**: Student

### Professor
- **Email**: `alice.johnson@example.com`
- **Name**: Dr. Alice Johnson
- **Role**: Professor

## 📖 Usage Guide

### For Students

1. **Login**: Visit `/login` and enter a student email address
2. **Browse Courses**: View all available courses on the homepage
3. **Course Details**: Click on any course to view detailed information
4. **Enroll**: Click "Enroll Now" to join a course
5. **Confirmation**: You'll be redirected to a confirmation page upon successful enrollment

### For Professors

1. **Login**: Visit `/login` and enter the professor email address
2. **Browse Courses**: View all courses (you'll see courses you teach)
3. **Edit Courses**: Click on a course you teach, then click "Edit Course"
4. **Update Details**: Modify the course title, description, or difficulty level
5. **Save Changes**: Click "Save Changes" to update the course

## 🏗️ Project Structure

```
EdTech-Learning-Platform/
├── backend/                 # GraphQL API server
│   ├── prisma/             # Database schema and migrations
│   │   ├── schema.prisma   # Prisma database schema
│   │   └── migrations/     # Database migration files
│   ├── src/                # TypeScript source code
│   │   ├── index.ts        # Server entry point
│   │   ├── schema.ts       # GraphQL schema definitions
│   │   └── resolvers.ts    # GraphQL resolvers
│   ├── seed.js             # Database seeding script
│   └── package.json        # Backend dependencies
├── frontend/               # Next.js application
│   ├── src/                # Source code
│   │   ├── app/            # Next.js App Router pages
│   │   │   ├── page.tsx    # Homepage
│   │   │   ├── login/      # Login page
│   │   │   └── courses/    # Course pages
│   │   ├── components/     # Reusable React components
│   │   ├── lib/            # Utility functions and types
│   │   ├── services/       # External service integrations
│   │   └── store/          # State management
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔧 Development Commands

### Backend Commands

```bash
cd backend

# Start development server
npm run dev

# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Re-seed database
node seed.js
```

### Frontend Commands

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🚀 Deployment

### Backend Deployment

1. Set up a PostgreSQL database on your hosting provider
2. Update the `DATABASE_URL` environment variable
3. Run migrations: `npx prisma migrate deploy`
4. Deploy the backend application

### Frontend Deployment

1. Update the `NEXT_PUBLIC_GRAPHQL_ENDPOINT` to point to your deployed backend
2. Build the application: `npm run build`
3. Deploy to your hosting provider (Vercel, Netlify, etc.)

## 🧪 Testing

### Manual Testing

1. **Login Flow**: Test with all provided test accounts
2. **Student Enrollment**: Verify students can enroll in courses
3. **Professor Editing**: Confirm professors can only edit their assigned courses
4. **Permission Validation**: Ensure proper access controls are enforced

### GraphQL Playground

Visit `http://localhost:4000/graphql` to interact with the GraphQL API directly:

```graphql
# Example: Get all courses
query GetCourses {
  courses {
    id
    title
    description
    level
    enrollments {
      role
      user {
        name
        email
      }
    }
  }
}

# Example: Get user by email
query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    name
    email
    role
    enrollments {
      role
      course {
        title
      }
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Database Connection Error**
- Verify PostgreSQL is running
- Check DATABASE_URL environment variable
- Ensure database exists and credentials are correct

**GraphQL Server Not Starting**
- Check for port conflicts (default: 4000)
- Verify all dependencies are installed
- Review server logs for specific error messages

#### Frontend Issues

**Cannot Connect to GraphQL Server**
- Ensure backend server is running
- Verify NEXT_PUBLIC_GRAPHQL_ENDPOINT is correct
- Check browser network tab for request errors

**Login Issues**
- Verify database is seeded with test accounts
- Check GraphQL queries in browser dev tools
- Ensure the userByEmail resolver is working

#### General Issues

**Module Not Found Errors**
- Run `npm install` in the respective directory
- Delete node_modules and package-lock.json, then reinstall
- Verify Node.js version compatibility

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the GitHub issues for similar problems
3. Create a new issue with detailed information about your problem


