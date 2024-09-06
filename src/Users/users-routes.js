const { Router } = require("express");
const controller = require("./users-controller");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     USER:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: interger
 *           description: The auto-generated id of user
 *         name:
 *            type: string
 *            description: The name of the user
 *         username:
 *            type : string
 *            description: The unique username of the user
 *         email:
 *            type: string
 *            description: The unique email of the user
 *         password:
 *            type: string
 *            description: The password of the user
 *
 */

/**
 * @swagger
 * /api/user/signup/:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: student
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       403:
 *         description: Access denied (e.g., insufficient permissions)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.post("/signup/student", controller.signUpStudent);

/**
 * @swagger
 * /api/user/students:
 *   get:
 *     summary: Get all students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     example: student
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get("/students", controller.getStudents);

/**
 * @swagger
 * /api/user/students/{id}:
 *   get:
 *     summary: Get a specific student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student's ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: student
 *       404:
 *         description: Student not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get("/students/:id", controller.getStudentById);

/**
 * @swagger
 * /api/user/students/{id}:
 *   put:
 *     summary: Update a student's information
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: student
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/students/:id",
  // controller.authenticateToken,
  //authorizeRoles(["admin", "teacher"]),
  controller.updateStudent
);

/**
 * @swagger
 * /api/user/students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student's ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student deleted successfully
 *       404:
 *         description: Student not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.delete("/student/:id", controller.deleteStudent);
router.get(
  "/student/dashboard",
  controller.authenticateToken,
  controller.authorizeRole("student"),
  (req, res) => {
    res.json({ message: "Welcome to the student dashboard" });
  }
);

/**
 * @swagger
 * /api/user/signup/teacher/:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: teacher
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       403:
 *         description: Access denied (e.g., insufficient permissions)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.post("/signup/teacher", controller.signUpTeacher);

/**
 * @swagger
 * /api/user/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     example: teacher
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/teachers",
  // controller.authorizeRole(["teacher", "admin"]),
  controller.getTeachers
);

/**
 * @swagger
 * /api/user/teacher/{id}:
 *   get:
 *     summary: Get a specific teacher by ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher's ID
 *     responses:
 *       200:
 *         description: teacher retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: teacher
 *       404:
 *         description: teacher not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/teacher/:id",
  // controller.authorizeRole(["student", "teacher", "admin"]),
  controller.getTeacherById
);

/**
 * @swagger
 * /api/user/teacher/{id}:
 *   put:
 *     summary: Update a teacher's information
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: teacher
 *       400:
 *         description: Bad request
 *       404:
 *         description: Teacher not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/teacher/:id",
  // controller.authenticateToken,
  //authorizeRoles(["admin", "teacher"]),
  controller.updateTeacher
);

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The teacher's ID
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/teacher/:id"
  // controller.authorizeRole("admin"),
  // controller.deleteTeacher
);
router.get(
  "/teacher/dashboard",
  controller.authenticateToken,
  controller.authorizeRole("teacher"),
  (req, res) => {
    res.json({ message: "Welcome to the teacher dashboard" });
  }
);

/////////////////////     Login's routes  ////////////////////////

router.post("/login", controller.login);

/////////////////////     Admin's routes  ////////////////////////

/**
 * @swagger
 * /api/user/signup/admin/:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: admin
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       403:
 *         description: Access denied (e.g., insufficient permissions)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.post("/signup/admin", controller.signUpAdmin);

/**
 * @swagger
 * /api/user/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                     example: admin
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/admins",
  // controller.authorizeRole("admin"),
  controller.getAdmins
);

/**
 * @swagger
 * /api/user/admin/{id}:
 *   get:
 *     summary: Get a specific admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The admin's ID
 *     responses:
 *       200:
 *         description: Admin retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: admin
 *       404:
 *         description: Admin not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/admin/:id",
  // controller.authorizeRole("admin"),
  controller.getAdminById
);

/**
 * @swagger
 * /api/user/admin/{id}:
 *   put:
 *     summary: Update a admin's information
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The admin's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   example: admin
 *       400:
 *         description: Bad request
 *       404:
 *         description: Admin not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/admin/:id",
  // controller.authenticateToken,
  //authorizeRoles(["admin", "teacher"]),
  controller.updateAdmin
);

/**
 * @swagger
 * /api/user/admin/{id}:
 *   delete:
 *     summary: Delete a admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The admin's ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/admin/:id",
  controller.authorizeRole("admin"),
  controller.deleteAdmin
);
router.get(
  "/admin/dashboard",
  controller.authenticateToken,
  controller.authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
  }
);

/////////////////////     result's routes  ////////////////////////

/**
 * @swagger
 * /api/user/create/result/:
 *   post:
 *     summary: Create a new result
 *     tags: [Result]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           properties:
 *               id:
 *                 type: integer
 *               mathematics:
 *                 type: string
 *                 example: 57 = c
 *               english:
 *                 type: string
 *                 example: 91 = A
 *               civic:
 *                 type: string
 *                 example: 95 = A
 *               verbal:
 *                 type: string
 *                 example: 95 = A
 *               social_studies:
 *                 type: string
 *                 example: 95 = A
 *               quntitative:
 *                 type: string
 *                 example: 95 = A
 *               agric:
 *                 type: string
 *                 example: 95 = A
 *               bst:
 *                 type: string
 *                 example: 95 = A
 *               session:
 *                 type: string
 *                 example: first Term
 *               year:
 *                 type: string
 *                 example: 25/3/2024
 *     responses:
 *       201:
 *         description: Result created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               mathematics:
 *                 type: string
 *               english:
 *                 type: string
 *               civic:
 *                 type: string
 *               verbal:
 *                 type: string
 *               social_studies:
 *                 type: string
 *               quntitative:
 *                 type: string
 *               agric:
 *                 type: string
 *               bst:
 *                 type: string
 *               session:
 *                 type: string
 *               year:
 *                 type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       403:
 *         description: Access denied (e.g., insufficient permissions)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.post("/create/result", controller.addResult);

/**
 * @swagger
 * /api/user/results:
 *   get:
 *     summary: Get all results
 *     tags: [Result]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   id:
 *                 type: integer
 *               mathematics:
 *                 type: string
 *               english:
 *                 type: string
 *               civic:
 *                 type: string
 *               verbal:
 *                 type: string
 *               social_studies:
 *                 type: string
 *               quntitative:
 *                 type: string
 *               agric:
 *                 type: string
 *               bst:
 *                 type: string
 *               session:
 *                 type: string
 *               year:
 *                 type: string
 *               userId:
 *                  type: integer
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get("/results", controller.getResults);

/**
 * @swagger
 * /api/user/result/{id}:
 *   get:
 *     summary: Get a specific result by  user's ID
 *     tags: [Result]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student's ID
 *     responses:
 *       201:
 *         description: Result retrived successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               id:
 *                 type: integer
 *               mathematics:
 *                 type: string
 *               english:
 *                 type: string
 *               civic:
 *                 type: string
 *               verbal:
 *                 type: string
 *               social_studies:
 *                 type: string
 *               quntitative:
 *                 type: string
 *               agric:
 *                 type: string
 *               bst:
 *                 type: string
 *               session:
 *                 type: string
 *               year:
 *                 type: string
 *               userId:
 *                  type: integer
 *       404:
 *         description: result not found
 *       403:
 *         description: Access denied
 *       401:
 *         description: Unauthorized
 */
router.get("/result/:id", controller.getResultById);

function getRedirectPath(role) {
  switch (role) {
    case "student":
      return "/student/dashboard";
    case "teacher":
      return "/teacher/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}

module.exports = router;
