# Postman Testing Guide

Test the EdTech Platform GraphQL API using Postman.

## Setup

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Configure Postman**
   - URL: `http://localhost:4000/graphql`
   - Method: `POST`
   - Headers: `Content-Type: application/json`

## Test Queries

### 1. Get All Courses

```json
{
  "query": "{ courses { id title description level enrollments { role user { name email } } } }"
}
```

### 2. Get Course by ID

```json
{
  "query": "query GetCourse($id: ID!) { course(id: $id) { id title description level enrollments { role user { name email } } } }",
  "variables": {
    "id": "COURSE_ID_HERE"
  }
}
```

### 3. Get User by Email (Login)

```json
{
  "query": "query GetUser($email: String!) { userByEmail(email: $email) { id name email role enrollments { role course { title } } } }",
  "variables": {
    "email": "alice.johnson@example.com"
  }
}
```

### 4. Get All Users

```json
{
  "query": "{ users { id name email role enrollments { role course { title } } } }"
}
```

## Test Mutations

### 1. Enroll Student

```json
{
  "query": "mutation Enroll($userId: ID!, $courseId: ID!) { enroll(userId: $userId, courseId: $courseId) { id role user { name } course { title } } }",
  "variables": {
    "userId": "USER_ID_HERE",
    "courseId": "COURSE_ID_HERE"
  }
}
```

### 2. Update Course (Professor Only)

```json
{
  "query": "mutation UpdateCourse($id: ID!, $userId: ID!, $data: UpdateCourseInput!) { updateCourse(id: $id, userId: $userId, data: $data) { id title description level } }",
  "variables": {
    "id": "COURSE_ID_HERE",
    "userId": "PROFESSOR_USER_ID",
    "data": {
      "title": "Updated Course Title",
      "description": "Updated description",
      "level": "advanced"
    }
  }
}
```

## Test Accounts

Use these seeded accounts for testing:

**Students:**
- john.doe@example.com
- jane.smith@example.com

**Professor:**
- alice.johnson@example.com

## Error Testing

### 1. Invalid User ID

```json
{
  "query": "query GetUser($id: ID!) { user(id: $id) { name } }",
  "variables": { "id": "invalid-id" }
}
```

### 2. Unauthorized Course Edit

Try updating a course with a student user ID:

```json
{
  "query": "mutation UpdateCourse($id: ID!, $userId: ID!, $data: UpdateCourseInput!) { updateCourse(id: $id, userId: $userId, data: $data) { id title } }",
  "variables": {
    "id": "COURSE_ID",
    "userId": "STUDENT_USER_ID",
    "data": { "title": "Hacked Title" }
  }
}
```

Should return: "Only professors of this course can edit it"

### 3. Duplicate Enrollment

Try enrolling the same user in the same course twice.

## Quick Test Workflow

1. **Get all courses** - Note course IDs
2. **Get user by email** - Note user IDs and roles
3. **Enroll student** - Use student ID and course ID
4. **Update course** - Use professor ID and course they teach
5. **Verify changes** - Get course again to confirm updates

## Expected Responses

All successful queries return data in `data` field.
Errors return in `errors` field with descriptive messages.

Authentication/authorization errors:
- "User not found"
- "Only professors of this course can edit it"
- "User is already enrolled in this course"