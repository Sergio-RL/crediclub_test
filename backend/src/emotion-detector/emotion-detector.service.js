import { readFileSync } from "fs";
import axios from "axios";

class EmotionDetectorService {
  async uploadFile(photoPath) {
    // const photo = readFileSync(photoPath);
    // console.log(photo);
    await axios.post("https://api-us.faceplusplus.com/facepp/v3/detect");
    try {
      const res = "res";
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    return [
      {
        emotion: "Enojado",
        percentage: 76,
      },
      {
        emotion: "Felíz",
        percentage: 99,
      },
      {
        emotion: "Triste",
        percentage: 88,
      },
    ];
  }
}

export default EmotionDetectorService;
