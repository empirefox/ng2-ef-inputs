import MarkdownIt = require('markdown-it');
const {escape} = require('markdown-it-regexp/lib/utils');
const twemoji = require('twemoji');

const options = {
  html: false,
  linkify: true,
  typographer: true,
};

let _amapKey: string;

export function setAmapKey(amapKey: string) {
  _amapKey = amapKey;
}

function blockEmbedOptions(amapKey?: string) {
  return {
    services: {
      youtube: require('markdown-it-block-embed/lib/services/YouTubeService'),
      vimeo: require('markdown-it-block-embed/lib/services/VimeoService'),
      vine: require('markdown-it-block-embed/lib/services/VineService'),
      prezi: require('markdown-it-block-embed/lib/services/PreziService'),
      youku: require('./youku'),
      qq: require('./qq'),
      amap: require('./amap'),
    },
    amap: { key: () => amapKey || _amapKey },
  };
}

const blockImageOptions = {
  outputContainer: 'div',
  containerClassName: 'block-image-container',
};

const alerts = 'success|info|warning|danger'.split('|');
const containerOptions = {
  validate: (params: string) => params.trim().match(/^!{1,4}$/),

  render: (tokens, idx) => {
    if (tokens[idx].nesting === 1) {
      // opening tag
      let name = alerts[tokens[idx].info.trim().length - 1];
      return '<div class="alert alert-' + escape(name) + '" role="alert">\n';
    } else {
      // closing tag
      return '</div>\n';
    }
  }
};

const labels = 'default|primary|success|info|warning|danger'.split('|');
const codeInlineRule = (tokens, idx, opts, env, slf) => {
  let token = tokens[idx];
  let tag = 'code';

  let match = token.content.match(/^(#+)\s*(.*)/);
  if (match) {
    tag = 'span';
    let label = labels[match[1].length - 1] || labels[0];
    token.content = match[2];
    token.attrPush(['class', `label label-${label}`]);
  }

  return `<${tag} ${slf.renderAttrs(token)}>${escape(token.content)}</${tag}>`;
};

export function createMd(amapKey?: string) {
  let md = new MarkdownIt(options).
    use(require('markdown-it-abbr')).
    use(require('markdown-it-block-embed'), blockEmbedOptions(amapKey)).
    use(require('markdown-it-block-image'), blockImageOptions).
    use(require('markdown-it-container'), 'alert', containerOptions).
    use(require('markdown-it-emoji')).
    use(require('markdown-it-footnote')).
    use(require('markdown-it-ins')).
    use(require('markdown-it-mark')).
    use(require('markdown-it-sub')).
    use(require('markdown-it-sup')).
    use(require('fa-tool/dist/markdown-it-plugin'));

  md.renderer.rules['emoji'] = (token, idx) => twemoji.parse(token[idx].content);
  md.renderer.rules['code_inline'] = codeInlineRule;
  md.renderer.rules['table_open'] = () => '<table class="table table-hover table-inverse table-striped">\n';

  return md;
}

