import { Router } from "express";
import Multer from "multer";
import os from "os";

import EmotionDetectorController from "./emotion-detector.controller";

const router = Router();
const upload = Multer({ dest: os.tmpdir() });

const routes = new EmotionDetectorController();

router.post("/file", upload.single("photo"), routes.uploadFile);

export default router;
