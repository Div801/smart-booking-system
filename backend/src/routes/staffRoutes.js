import express from "express";
import {
  createStaff,
  getStaffList,
  updateStaff,
  toggleAvailability,
} from "../controllers/staffController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const withStaffId = (handler) => (req, res, next) => {
  req.params.staffId = req.params.id;
  return handler(req, res, next);
};

router.post("/", protect, requireRole("admin"), createStaff);
router.get("/", protect, requireRole("admin", "staff"), getStaffList);
router.patch("/:id", protect, requireRole("admin"), withStaffId(updateStaff));
router.patch(
  "/:id/toggle",
  protect,
  requireRole("admin", "staff"),
  withStaffId(toggleAvailability)
);

export default router;
