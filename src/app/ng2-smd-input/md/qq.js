const VideoServiceBase = require('markdown-it-block-embed/lib/services/VideoServiceBase');

class QqService extends VideoServiceBase {

  constructor(name, options, env) {
    super(name, options, env);
  }

  getDefaultOptions() {
    return { width: 640, height: 390 };
  }

  extractVideoID(reference) {
    let match = reference.match(/https?:\/\/v\.qq.com\/(?:x\/(?:page|cover\/[a-zA-Z0-9]+)\/|iframe\/player\.html\?.*vid=)([a-zA-Z0-9]+)/);
    return match ? match[1] : reference;
  }

  getVideoUrl(videoID) {
    let escapedVideoID = this.env.md.utils.escapeHtml(videoID);
    return `//v.qq.com/iframe/player.html?vid=${escapedVideoID}&tiny=0&auto=0`;
  }

}

module.exports = QqService;
