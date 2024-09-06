const signUp =
  "INSERT INTO users (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const login = "SELECT * FROM users WHERE email = $1";
const getStudents = "SELECT * FROM users WHERE role = 'student'";
const getStudentById = "SELECT * FROM users WHERE role = 'student' AND id = $1";
const deleteStudent = "DELETE FROM users WHERE id = $1 AND role = 'student'";
const getAdmins = "SELECT * FROM users WHERE role = 'admin'";
const getAdminById = "SELECT * FROM users WHERE role = 'admin' AND id = $1";
const deleteAdmin = "DELETE FROM users WHERE id = $1 AND role = 'admin'";
const getTeachers = "SELECT * FROM users WHERE role = 'teacher'";
const getTeacherById = "SELECT * FROM users WHERE role = 'teacher' AND id = $1";
const deleteTeacher = "DELETE FROM users WHERE id = $1 AND role = 'student'";
const getResults = "SELECT * FROM result";
const getResultByUserId = "SELECT * FROM result WHERE userId = $1";
const addResult =
  "INSERT INTO result (userId, mathematics, english, civic, verbal, social_studies, quntitative, agric, bst, session, year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

module.exports = {
  signUp,
  login,
  getStudents,
  getStudentById,
  deleteStudent,
  getAdmins,
  getAdminById,
  deleteAdmin,
  getTeachers,
  getTeacherById,
  deleteTeacher,
  getResults,
  getResultByUserId,
  addResult,
};
