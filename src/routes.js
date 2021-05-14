import express from "express";
import multer from "multer";
import UserController from "./controllers/userController";
import EventController from "./controllers/eventController";
import DashboardController from "./controllers/dashboardController";
import LoginController from "./controllers/loginController";
import RegistrationController from "./controllers/registrationController";
import ApprovalController from "./controllers/approvalController";
import RejectionController from "./controllers/rejectionController";
import { verifyToken } from "./middleware/verifyToken";

// import UploadConfig from "./config/upload";
import UploadConfigS3 from "./config/s3_upload"

const routes = express.Router();

//* for local file save in file folder 
//* const upload = multer(UploadConfig);

//* config for saving file in AWS s3
const uploadS3 = multer(UploadConfigS3)

routes.get("/", (req, res) => {
  res.status(200).send({ status: 200 });
});

//login
routes.post("/login", LoginController.authenticateUser);

//registration
routes.post(
  "/registration/:eventId",
  verifyToken,
  RegistrationController.create
);
routes.get(
  "/registration",
  verifyToken,
  RegistrationController.getMyRegistration
);
routes.get(
  "/registration/:registration_id",
  RegistrationController.getRegistration
);
//approval
routes.post(
  "/registration/:registration_id/approval",
  verifyToken,
  ApprovalController.approval
);
//rejection
routes.post(
  "/registration/:registration_id/rejection",
  verifyToken,
  RejectionController.rejection
);

//dashboard
routes.get("/dashboard", verifyToken, DashboardController.getAllEvent);
routes.get("/dashboard/:sport", verifyToken, DashboardController.getAllEvent);
routes.get(
  "/user/events",
  verifyToken,
  DashboardController.getAllEventByUserId
);
routes.get("/event/:eventId", verifyToken, DashboardController.getEventById);

//Event
routes.post(
  "/event",
  verifyToken,
  uploadS3.single("thumbnail"),
  EventController.createEvent
);
routes.delete("/event/:eventId", verifyToken, EventController.deleteEventById);

//User
routes.get("/user/:userId", UserController.getUserById);
routes.post("/user/register", UserController.createUser);

export default routes;
