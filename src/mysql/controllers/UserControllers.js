const User = require("../model/UserModel");

const yup = require("yup");

const usercreationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    ),
});

async function AddUsers(req, res) {
  try {
    await usercreationSchema.validate(req.body);
    const { name, email, password } = req.body;

    // // Basic validation
    // if (!name || !email || !password) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Please provide name, email, and password",
    //   });
    // }

    // Create user
    const user = await User.createUser({ name, email, password });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
    };

    res.status(201).json({
      status: "success",
      data: userResponse,
    });
  } catch (error) {
    console.error("Error in addUser:", error);

    //Handle yup validation errors
    if (error.name === "ValidationError") {
      const errors = error.inner.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        status: "fail",
        message: "Validation failed",
        errors,
      });
    }

    // Handle duplicate email error (common in user creation)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.getUserById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: "user updated",
      data: user,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.deleteUser(req.params.id);
    res.status(200).json({
      status: "user deleted",
      data: user,
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

module.exports = {
  AddUsers: AddUsers,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
