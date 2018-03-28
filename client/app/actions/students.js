export const loadStudents = (students) => {
  return {
    type: 'LOAD_STUDENTS',
    students,
  }
}