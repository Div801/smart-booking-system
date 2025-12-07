import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "API Root Active" });
});

export default router;
