import { sortBy } from "lodash";
import { translatedEmotions } from "./constants";
import EmotionDetectorService from "./emotion-detector.service";

class EmotionDetectorController {
  constructor() {
    this.emotionDetectorService = new EmotionDetectorService();
    this.uploadFile = this.uploadFile.bind(this);
  }

  async uploadFile(req, res) {
    const photoPath = req.file.path;
    const detectedEmotions = await this.emotionDetectorService.uploadFile(
      photoPath
    );
    const emotions = Object.entries(detectedEmotions).map(([key, value]) => ({
      emotion: translatedEmotions[key],
      percentage: value,
    }));

    const [first, second, third, ...rest] = sortBy(emotions, [
      "percentage",
    ]).reverse();

    res.send({ emotions: [first, second, third] });
  }
}

export default EmotionDetectorController;
