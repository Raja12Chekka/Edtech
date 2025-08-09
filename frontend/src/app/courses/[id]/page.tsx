'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { client } from '@/services/graphql';
import { GET_COURSE_BY_ID } from '@/lib/queries';
import { ENROLL_IN_COURSE, UPDATE_COURSE } from '@/lib/mutations';
import { Course } from '@/lib/types';

interface GetCourseByIdResponse {
  course: Course;
}

interface UpdateCourseResponse {
  updateCourse: Course;
}

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [editMode, setEditMode] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftDescription, setDraftDescription] = useState('');
  const [draftLevel, setDraftLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');


  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = await client.request<GetCourseByIdResponse>(GET_COURSE_BY_ID, { id: Array.isArray(id) ? id[0] : id });
        setCourse(data.course);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);


  useEffect(() => {
    if (course) {
      setDraftTitle(course.title);
      setDraftDescription(course.description);

      const lvl = (course.level as 'beginner' | 'intermediate' | 'advanced') || 'beginner';
      setDraftLevel(lvl);
    }
  }, [course]);

  const handleEnroll = async () => {
    if (!isAuthenticated || !user) {
      router.push('/login');
      return;
    }

    try {
      await client.request(ENROLL_IN_COURSE, { userId: user.id, courseId: Array.isArray(id) ? id[0] : id });
      router.push(`/enrollment-confirmation?courseId=${id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to enroll in course');
    }
  };

  const handleSave = async () => {
    if (!course || !user) return;
    try {
      const payload: any = {};
      if (draftTitle !== course.title) payload.title = draftTitle;
      if (draftDescription !== course.description) payload.description = draftDescription;
      if (draftLevel !== course.level) payload.level = draftLevel;
      if (Object.keys(payload).length === 0) {
        setEditMode(false);
        return;
      }
      const data = await client.request<UpdateCourseResponse>(UPDATE_COURSE, {
        id: course.id,
        userId: user.id,
        data: payload,
      });
      setCourse(data.updateCourse);
      setEditMode(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save');
    }
  };

  const isProfessorOfCourse = user?.role === 'professor' && course?.enrollments?.some(
    (enrollment) => enrollment.user?.id === user?.id && enrollment.role === 'professor'
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center glass-card p-8 rounded-2xl">
          <p className="text-lg font-medium">Loading Course...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center glass-card p-8 rounded-2xl">
          <p className="text-lg font-medium text-red-600">Error: {error}</p>
        </div>
      );
    }

    if (!course) {
      return (
        <div className="text-center glass-card p-8 rounded-2xl">
          <p className="text-lg font-medium">Course not found.</p>
        </div>
      );
    }
    
    const isEnrolled = isAuthenticated && course.enrollments?.some(
      (enrollment) => enrollment.user?.id === user?.id
    );

    return (
      <div className="glass-card rounded-2xl p-8 md:p-12">
        {editMode ? (

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter course title"
                />
              </div>


              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={draftDescription}
                  onChange={(e) => setDraftDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter course description"
                />
              </div>


              <div>
                <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Level
                </label>
                <select
                  id="level"
                  value={draftLevel}
                  onChange={(e) => setDraftLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>


              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 btn-primary text-lg py-3 rounded-xl font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (

          <>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{course.title}</h1>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6 ${
                course.level === 'beginner'
                  ? 'bg-green-100 text-green-800'
                  : course.level === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {course.level.toUpperCase()}
            </span>
            <p className="text-lg text-gray-600 leading-relaxed">{course.description}</p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              {user?.role === 'professor' ? (
                <button 
                  onClick={() => setEditMode(true)}
                  className="w-full btn-primary text-lg"
                >
                  Edit Course
                </button>
              ) : isEnrolled ? (
                <div className="text-center p-4 rounded-lg bg-green-50 text-green-700 font-semibold">
                  You are already enrolled in this course.
                </div>
              ) : (
                <button onClick={handleEnroll} className="w-full btn-primary text-lg">
                  Enroll Now
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-12">{renderContent()}</div>
  );
}
