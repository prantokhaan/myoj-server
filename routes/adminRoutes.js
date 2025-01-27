const express = require("express");
const {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  removeAdmin,
  getAdminRole,
  updateAdminRole,
  getSpecificRoleAdmin,
  getActiveStatus,
  updateAdminActive,
  updateAdminStatus,
  getActiveAdmins,
  getInactiveAdmins,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", getAdmins);
router.get("/admin/:id", getAdminById);
router.post("/create", createAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", removeAdmin);
router.get("/role/:role", getAdminRole);
router.put("/updateRole/:id", updateAdminRole);
router.get("/specificRole/:role", getSpecificRoleAdmin);
router.get("/active", getActiveStatus);
router.put("/updateActive/:id", updateAdminActive);
router.put("/updateStatus/:id", updateAdminStatus);
router.get("/getActive", getActiveAdmins);
router.get("/getInactive", getInactiveAdmins);

module.exports = router;