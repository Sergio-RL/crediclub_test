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
      const photo = await this.getPhotoInBase64(photoPath);
      const formdata = this.generateFormData(photo);
      const { data } = await axios.post(this.url, formdata);

      return data.faces[0].attributes.emotion;
    } catch (error) {
      return [];
    }
  }

  generateFormData(photo) {
    const formdata = new FormData();
    formdata.append("api_key", process.env.API_KEY);
    formdata.append("api_secret", process.env.API_SECRET);
    formdata.append("return_attributes", "emotion");
    formdata.append("image_base64", photo);
    return formdata;
  }

  async getPhotoInBase64(photoPath) {
    const photo = await this.readFile(photoPath);
    return photo.toString("base64");
  }
}

export default EmotionDetectorService;
