'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from '@/services/graphql';
import { GET_ALL_COURSES } from '@/lib/queries';
import { Course } from '@/lib/types';

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await client.request<{ courses: Course[] }>(GET_ALL_COURSES);
        setCourses(data.courses);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center">Loading courses...</p>;
    }

    if (error) {
      return <p className="text-center text-red-600">Error: {error}</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h2>
                <p className="text-gray-600 mb-4 h-24 overflow-hidden">{course.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level.toUpperCase()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Discover Our Courses</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your journey to knowledge starts here.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
