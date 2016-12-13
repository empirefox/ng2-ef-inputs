import { parse, toUrl } from 'ng2-amap-input';

const VideoServiceBase = require('markdown-it-block-embed/lib/services/VideoServiceBase');

// @[amap](102.99517,29.98106,my place,my address)
// const parseRegexp = /^(-?\d*\.?\d+,-?\d*\.?\d+),([^,]+)(?:,(.+))?$/;

class AmapService extends VideoServiceBase {

  constructor(name, options, env) {
    super(name, options, env);
  }

  getDefaultOptions() {
    return { width: 640, height: 390 };
  }

  extractVideoID(reference) {
    return reference;
  }

  getVideoUrl(videoID) {
    return toUrl(parse(`amap:${videoID}`), this.options.key());
  }

}

module.exports = AmapService;
