import { readFile as rf, readFileSync } from "fs";
import { promisify } from "util";
import axios from "axios";

class EmotionDetectorService {
  url = "https://api-us.faceplusplus.com/facepp/v3/detect";

  constructor() {
    this.readFile = promisify(rf);
  }

  async uploadFile(photoPath) {
    try {
      const photo = await this.readFile(photoPath);
      const photoInBase64 = photo.toString("base64");
      const formdata = new FormData();

      formdata.append("api_key", process.env.API_KEY);
      formdata.append("api_secret", process.env.API_SECRET);
      formdata.append("return_attributes", "emotion");
      formdata.append("image_base64", photoInBase64);

      const response = await axios.post(this.url, formdata);
      return response.data.faces[0].attributes.emotion;
    } catch (error) {
      return [];
    }
  }
}

export default EmotionDetectorService;
