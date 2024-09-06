const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../../db");
const queries = require("./users-queries");
const { log } = require("util");



//////////////////           Student's controllers          ////////////////////////////////////


const signUpStudent = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validation checks
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.signUp, [
      name,
      username,
      email,
      hashedPassword,
      "student",
    ]);
    res.status(201).json({
      message: "Student created successfully",
      student: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const getStudents = async (req, res) => {
  try {
    const result = await pool.query(queries.getStudents);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students" });
  }
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getStudentById, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching student" });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Please provide name and email" });
  }

  try {
    const student = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'student'",
      [id]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updateFields = [];
    const updateValues = [];
    let query = "UPDATE users SET";

    if (name) {
      updateFields.push("name = $1");
      updateValues.push(name);
    }

    if (email) {
      updateFields.push("email = $2");
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = $3");
      updateValues.push(hashedPassword);
    }

    updateValues.push(id); 
    query += ` ${updateFields.join(", ")} WHERE id = $${
      updateFields.length + 1
    } RETURNING id, name, email, role`;

    const result = await pool.query(query, updateValues);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.deleteStudent, [id]);
    if (result.rowCount > 0) {
      res.json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ error: "Student not found or not a student" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting student" });
  }
};





//////////////////           Admin's controller          ////////////////////////////////////



const signUpAdmin = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validation checks
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.signUp, [
      name,
      username,
      email,
      hashedPassword,
      "admin",
    ]);
    res
      .status(201)
      .json({ message: "admin created successfully", user: result.rows[0] });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error creating user" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const result = await pool.query(queries.getAdmins);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching Admins" });
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getAdminById, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching User" });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Please provide name and email" });
  }

  try {
    const admin = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'admin'",
      [id]
    );

    if (admin.rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const updateFields = [];
    const updateValues = [];
    let query = "UPDATE users SET";

    if (name) {
      updateFields.push("name = $1");
      updateValues.push(name);
    }

    if (email) {
      updateFields.push("email = $2");
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = $3");
      updateValues.push(hashedPassword);
    }

    updateValues.push(id); // for the WHERE clause
    query += ` ${updateFields.join(", ")} WHERE id = $${
      updateFields.length + 1
    } RETURNING id, name, email, role`;

    const result = await pool.query(query, updateValues);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin" });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.deleteAdmin, [id]);
    if (result.rowCount > 0) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting admin" });
  }
};




//////////////////           Teacher's controller         ////////////////////////////////////



const signUpTeacher = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validation checks
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.signUp, [
      name,
      username,
      email,
      hashedPassword,
      "teacher",
    ]);
    res.status(201).json({
      message: "teacher created successfully",
      teacher: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const getTeachers = async (req, res) => {
  try {
    const result = await pool.query(queries.getTeachers);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching teachers" });
  }
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.getTeacherById, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching User" });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Please provide name and email" });
  }

  try {
    const updateTeacher = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'teacher'",
      [id]
    );

    if (student.rows.length === 0) {
      return res.status(404).json({ error: "teacher not found" });
    }

    const updateFields = [];
    const updateValues = [];
    let query = "UPDATE users SET";

    if (name) {
      updateFields.push("name = $1");
      updateValues.push(name);
    }

    if (email) {
      updateFields.push("email = $2");
      updateValues.push(email);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = $3");
      updateValues.push(hashedPassword);
    }

    updateValues.push(id); 
    query += ` ${updateFields.join(", ")} WHERE id = $${
      updateFields.length + 1
    } RETURNING id, name, email, role`;

    const result = await pool.query(query, updateValues);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin" });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(queries.deleteTeacher, [id]);
    if (result.rowCount > 0) {
      res.json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ error: "Teacher not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting teacher" });
  }
};



//////////////////           Results's controllers          ////////////////////////////////////



const getResults = (req, res) => {
  pool.query(queries.getResults, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getResultById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getResultById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addResult = (req, res) => {
  const {
    userId,
    mathematics,
    english,
    civic,
    verbal,
    social_studies,
    quntitative,
    agric,
    bst,
    session,
    year,
  } = req.body;


  pool.query(
    queries.addResult,
    [
      userId,
      mathematics,
      english,
      civic,
      agric,
      social_studies,
      quntitative,
      verbal,
      bst,
      session,
      year,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Result Created Successfully.");
    }
  );
};

module.exports = {
  
};




//////////////////           Login's controllers         ////////////////////////////////////



const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query(queries.login, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      redirectTo: getRedirectPath(user.role), // Optional: redirect based on role
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};







//////////////////     Authentition and Authorization controllers              ////////////////////////////////////


const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};



module.exports = {
  login,
  signUpStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  signUpAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  signUpTeacher,
  getStudents,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getResults,
  getResultById,
  addResult,
  authenticateToken,
  authorizeRole,
};
