import User from "@/models/User";
import db from "@/utils/db";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await db.connectDb();
      const { user_id } = req.body;

      // Check if user_id is provided
      if (!user_id) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      // Find and delete the user
      const user = await User.findByIdAndDelete(user_id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await db.disconnectDb();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
