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
    const emotions = this.sortEmotions(detectedEmotions);
    res.send({ emotions });
  }

  sortEmotions(allEmotions) {
    const emotions = Object.entries(allEmotions).map(([key, value]) => ({
      emotion: translatedEmotions[key],
      percentage: value,
    }));
    const topEmotions = sortBy(emotions, ["percentage"]).reverse();
    return topEmotions.filter((_, i) => i < 3);
  }
}

export default EmotionDetectorController;
