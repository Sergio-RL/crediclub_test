import EmotionDetectorService from "./emotion-detector.service";

class EmotionDetectorController {
  constructor() {
    this.emotionDetectorService = new EmotionDetectorService();
    this.uploadFile = this.uploadFile.bind(this);
  }

  async uploadFile(req, res) {
    const photoPath = req.file.path;
    const emotions = await this.emotionDetectorService.uploadFile(photoPath);
    res.send({ emotions });
  }
}

export default EmotionDetectorController;
