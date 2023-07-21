import { Router } from "express";
import Multer from "multer";
import os from "os";

const router = Router();
const upload = Multer({ dest: os.tmpdir() });

router.post("/file", upload.single("photo"), (req, res) => {
  console.log(req.file.path);
  res.send({
    emotions: [
      {
        emotion: "Avergonzado",
        percentage: 88,
      },
      {
        emotion: "Sorprendido",
        percentage: 77,
      },
      {
        emotion: "Felíz",
        percentage: 99,
      },
    ],
  });
});

export default router;
