const VideoServiceBase = require('markdown-it-block-embed/lib/services/VideoServiceBase');

class YoukuService extends VideoServiceBase {

  constructor(name, options, env) {
    super(name, options, env);
  }

  getDefaultOptions() {
    return { width: 640, height: 390 };
  }

  extractVideoID(reference) {
    let match = reference.match(/https?:\/\/(?:v\.|player\.|static\.)?youku.com\/(?:(?:embed|player\.php\/sid)\/|v_show\/id_|.*VideoIDS=)([a-zA-Z0-9]+=*)/);
    return match ? match[1] : reference;
  }

  getVideoUrl(videoID) {
    let escapedVideoID = this.env.md.utils.escapeHtml(videoID);
    return `//player.youku.com/embed/${escapedVideoID}`;
  }

}

module.exports = YoukuService;
