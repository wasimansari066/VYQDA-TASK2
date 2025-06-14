const db = require("../db_connect");

class UserModel {
  static async getAllUsers() {
    try {
      const [rows] = await db.execute(
        "SELECT id, name, email, password, created_at FROM users"
      );
      return rows;
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error; // Re-throw to let the controller handle it
    }
  }

  static async getUserById(id) {
    try {
      const [rows] = await db.execute(
        "SELECT id, name, email, password, created_at FROM users WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error(`Error in getUserById for id ${id}:`, error);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const { name, email, password } = userData;
      const [result] = await db.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
      );

      return {
        id: result.insertId,
        name,
        email,
        password,
        created_at: new Date(), // Assuming your DB sets this automatically
      };
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  // Additional useful methods
  static async getUserByEmail(email) {
    try {
      const [rows] = await db.execute(
        "SELECT id, name, email, password FROM users WHERE email = ?",
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error(`Error in getUserByEmail for email ${email}:`, error);
      throw error;
    }
  }

  static async updateUser(id, updateData) {
    try {
      const { name, email } = updateData;
      await db.execute("UPDATE users SET name = ?, email = ? WHERE id = ?", [
        name,
        email,
        id,
      ]);
      return this.getUserById(id);
    } catch (error) {
      console.error(`Error in updateUser for id ${id}:`, error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      await db.execute("DELETE FROM users WHERE id = ?", [id]);
      return true;
    } catch (error) {
      console.error(`Error in deleteUser for id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = UserModel;
