'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function EnrollmentConfirmationPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  return (
    <div className="container mx-auto py-12">
      <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Enrollment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You have successfully enrolled in the course. Welcome aboard!
        </p>
        <div className="space-x-4">
          <Link href={`/courses/${courseId}`}>
            <button className="btn-primary text-lg">
              Go to Course
            </button>
          </Link>
          <Link href="/">
            <button className="btn-secondary text-lg">
              Back to All Courses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
