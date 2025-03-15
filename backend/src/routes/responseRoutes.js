import express from "express";
import { handleResponse } from "../controllers/responseController.js"; // Ensure correct path

const router = express.Router();

router.post("/", handleResponse);

export default router;
