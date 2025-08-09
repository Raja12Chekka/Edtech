export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  enrollments?: Enrollment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  enrollments?: Enrollment[];
}

export interface Enrollment {
  id: string;
  role: string;
  user?: User;
  course?: Course;
}
