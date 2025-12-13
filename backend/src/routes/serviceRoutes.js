import express from "express";
import {
  createService,
  getServices,
  updateService,
  deleteService,
  assignServiceToStaff,
} from "../controllers/serviceController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const withServiceId = (handler) => (req, res, next) => {
  req.params.serviceId = req.params.id;
  return handler(req, res, next);
};

const withServiceAndStaffIds = (handler) => (req, res, next) => {
  req.params.serviceId = req.params.id;
  if (!req.params.staffId && req.body?.staffId) {
    req.params.staffId = req.body.staffId;
  }
  return handler(req, res, next);
};

router.post("/", protect, requireRole("admin"), createService);
router.get("/", protect, requireRole("admin", "staff", "customer"), getServices);
router.patch("/:id", protect, requireRole("admin"), withServiceId(updateService));
router.delete("/:id", protect, requireRole("admin"), withServiceId(deleteService));
router.patch(
  "/:id/assign",
  protect,
  requireRole("admin"),
  withServiceAndStaffIds(assignServiceToStaff)
);

export default router;
