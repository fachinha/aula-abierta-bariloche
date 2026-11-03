import { UserProgress } from '../types';

const PROGRESS_KEY = 'aula_abierta_user_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  enrolledTalleres: [],
  favoriteIds: [],
  issuedCertificates: {},
  studentName: 'Estudiante de Bariloche'
};

export const getStoredProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading progress from localStorage:', e);
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to localStorage:', e);
  }
};

export const toggleLessonCompleted = (lessonId: string): UserProgress => {
  const current = getStoredProgress();
  const exists = current.completedLessons.includes(lessonId);
  const updatedLessons = exists
    ? current.completedLessons.filter(id => id !== lessonId)
    : [...current.completedLessons, lessonId];

  const updated: UserProgress = {
    ...current,
    completedLessons: updatedLessons
  };
  saveProgress(updated);
  return updated;
};

export const isLessonCompleted = (lessonId: string): boolean => {
  const current = getStoredProgress();
  return current.completedLessons.includes(lessonId);
};

export const calculateCourseProgress = (lessonIds: string[]): number => {
  if (!lessonIds || lessonIds.length === 0) return 0;
  const current = getStoredProgress();
  const completedCount = lessonIds.filter(id => current.completedLessons.includes(id)).length;
  return Math.round((completedCount / lessonIds.length) * 100);
};

export const recordCertificateIssued = (cursoId: string, studentName?: string): UserProgress => {
  const current = getStoredProgress();
  const updated: UserProgress = {
    ...current,
    studentName: studentName || current.studentName,
    issuedCertificates: {
      ...current.issuedCertificates,
      [cursoId]: new Date().toISOString()
    }
  };
  saveProgress(updated);
  return updated;
};

export const toggleFavorite = (cursoId: string): UserProgress => {
  const current = getStoredProgress();
  const exists = current.favoriteIds.includes(cursoId);
  const updatedFavorites = exists
    ? current.favoriteIds.filter(id => id !== cursoId)
    : [...current.favoriteIds, cursoId];

  const updated: UserProgress = {
    ...current,
    favoriteIds: updatedFavorites
  };
  saveProgress(updated);
  return updated;
};

export const recordWorkshopEnrollment = (tallerId: string): UserProgress => {
  const current = getStoredProgress();
  if (current.enrolledTalleres.includes(tallerId)) return current;
  const updated: UserProgress = {
    ...current,
    enrolledTalleres: [...current.enrolledTalleres, tallerId]
  };
  saveProgress(updated);
  return updated;
};
