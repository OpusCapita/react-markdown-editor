import React from 'react';
import Types from 'prop-types';
import Prism from 'prismjs';
import { Mark } from '@opuscapita/slate';

/**
 * Add the markdown syntax to Prism.
 */

// eslint-disable-next-line
Prism.languages.markdown = Prism.languages.extend("markup", {});

Prism.languages.insertBefore('markdown', 'prolog', {
  blockquote: {
    pattern: /^>(?:[\t ]*>)*.*/m,
    inside: {}
  },
  header1: {
    pattern: /^#{1}[\s]+.*$/m,
    inside: {}
  },
  header2: {
    pattern: /^#{2}[\s]+.*$/m,
    inside: {}
  },
  header3: {
    pattern: /^#{3}[\s]+.*$/m,
    inside: {}
  },
  header4: {
    pattern: /^#{4}[\s]+.*$/m,
    inside: {}
  },
  header5: {
    pattern: /^#{5}[\s]+.*$/m,
    inside: {}
  },
  header6: {
    pattern: /^#{6}[\s]+.*$/m,
    inside: {}
  },
  'header-no-offset': {
    pattern: /(^\s{1,3})#{1,6}[\s]+.*$/m,
    inside: {}
  },
  list: [{
    pattern: /^( *[\+\-\*] .*)/m,
    inside: {}
  }],
  'ordered-list': [{
    pattern: /^( *\d+\. .*)/m,
    inside: {}
  }],
  url: {
    pattern: /!?\[[^\]]*\](?:\([^)]*(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      punctuation: {
        pattern: /[\[\]!:]|[<>]|\(.*\)/
      }
    }
  },
  code: [{
    pattern: /(^|[^`])(```|`)[^`\n\r]*[^`\n\r]\2(?!`)/m,
    lookbehind: true,
  }],
  codeblock: [{
    pattern: /^```(?: *)(\n[^`]*)*\n```(?: *)/m,
    inside: {}
  }],
  bold: [{
    pattern: /(^|[^*])\*\*([^\*\r\n]*(\*[^\*\r\n]+\*[^\*\r\n]*)+|[^*\r\n]+)\*\*/m,
    lookbehind: true,
    greedy: true,
    inside: {
      italic: [{
        lookbehind: true,
        pattern: /(.{2,}?)\*[^\*\r\n]+\*(?=.{2,})/m,
        inside: {}
      }, {
        pattern: /_[^_\r\n]+_/m,
        inside: {}
      }]
    }
  }, {
    pattern: /(^|[^_]\b)__([^_\r\n]*(_[^_\r\n]+_[^_\r\n]*)+|[^\r\n]+)__/m,
    lookbehind: true,
    greedy: true,
    inside: {
      italic: [{
        lookbehind: true,
        // pattern: /\b_(?! )([\w*~\- ]*?_)\b/m,
        pattern: /(.{2,}?)_[^_\r\n]+_(?=.{2,})/,
        inside: {}
      }, {
        pattern: /\*[^*\r\n]+\*/,
        inside: {}
      }]
    }
  }],
  italic: [{
    pattern: /([^*]|^)\*([^*\r\n]*(\*\*[^*\r\n]+\*\*[^*\r\n]*)+|[^*\r\n]+)\*/m,
    lookbehind: true,
    greedy: true,
    inside: {
      bold: [{
        pattern: /(\b)__([^_\r\n]).+__(?=\b)/m,
        lookbehind: true,
        inside: {}
      }, {
        lookbehind: true,
        pattern: /(.+?)\*\*[^*\r\n]+\*\*(?=.+)/m,
        inside: {}
      }]
    }
  }, {
    pattern: /\b_(?! )([\w*~\- ]*?_)\b/m,
    // pattern: /\b_(?! )([\w*~\- ]*?([A-Za-z0-9*~\- ]_|___))\b/m,
    // pattern: /(?=\b)_[^]*([^_\r\n]*(__[^_\r\n]+__[^_\r\n]*)+|[^_\r\n]+?)[^]*_(?=\b)/m,
    greedy: true,
    inside: {
      bold: [{
        lookbehind: true,
        pattern: /\b__[a-z]*?__\b/m,
        // pattern: /\b__[\w*~\- ]*?__\b/m,
        // pattern: /(.+?)__[^_\r\n]+__(?=.+)/m,
        inside: {}
      }, {
        lookbehind: true,
        pattern: /(.+?)\*\*[^*\r\n]+\*\*(?=.+)/m,
        inside: {}
      }]
    }
  }],
  strikethrough: {
    pattern: /~~[^~\r\n].+[^~\r\n]~~/m,
    greedy: true,
    inside: {}
  },
  hr: {
    pattern: /(^\s{0,3})[-*]{3,}[\s]*$/,
    lookbehind: true
  }
});

Prism.languages.markdown.strikethrough.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.strikethrough.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.strikethrough.inside.url = Prism.util.clone(Prism.languages.markdown.url);

Prism.languages.markdown.bold[0].inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.bold[1].inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.italic[0].inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.italic[1].inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);

Prism.languages.markdown.bold[0].inside.italic[0].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.bold[0].inside.italic[1].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.bold[1].inside.italic[0].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.bold[1].inside.italic[1].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);

Prism.languages.markdown.italic[0].inside.bold[0].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.italic[0].inside.bold[1].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.italic[1].inside.bold[0].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.italic[1].inside.bold[1].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);

Prism.languages.markdown.url.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.url.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.url.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);

Prism.languages.markdown.bold[0].inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.bold[1].inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.italic[0].inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.italic[1].inside.url = Prism.util.clone(Prism.languages.markdown.url);

Prism.languages.markdown.header1.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.header2.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.header3.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.header4.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.header5.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown.header6.inside.url = Prism.util.clone(Prism.languages.markdown.url);
Prism.languages.markdown['header-no-offset'].inside.url = Prism.util.clone(Prism.languages.markdown.url);

Prism.languages.markdown.header1.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.header2.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.header3.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.header4.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.header5.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.header6.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown['header-no-offset'].inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

Prism.languages.markdown.header1.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.header2.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.header3.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.header4.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.header5.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.header6.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown['header-no-offset'].inside.italic = Prism.util.clone(Prism.languages.markdown.italic);

Prism.languages.markdown.header1.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.header2.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.header3.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.header4.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.header5.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.header6.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown['header-no-offset'].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);

Prism.languages.markdown.header1.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.header2.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.header3.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.header4.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.header5.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.header6.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown['header-no-offset'].inside.code = Prism.util.clone(Prism.languages.markdown.code);

Prism.languages.markdown.list[0].inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.list[0].inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.list[0].inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.list[0].inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.list[0].inside.url = Prism.util.clone(Prism.languages.markdown.url);

Prism.languages.markdown['ordered-list'][0].inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown['ordered-list'][0].inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown['ordered-list'][0].inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown['ordered-list'][0].inside.strikethrough =
  Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown['ordered-list'][0].inside.url = Prism.util.clone(Prism.languages.markdown.url);

Prism.languages.markdown.blockquote.inside.code = Prism.util.clone(Prism.languages.markdown.code);
Prism.languages.markdown.blockquote.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.markdown.blockquote.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
Prism.languages.markdown.blockquote.inside.strikethrough = Prism.util.clone(Prism.languages.markdown.strikethrough);
Prism.languages.markdown.blockquote.inside.url = Prism.util.clone(Prism.languages.markdown.url);

let rendererComponent = props => {
  let isLine = props.node.type === 'multiline';
  let hasMarks = props.mark;

  if (isLine) {
    return (<div className="oc-md-hl-block">{props.children}</div>);
  }

  if (hasMarks) {
    const className = props.mark ? 'oc-md-hl-' + props.mark.type : '';
    let content = props.children;

    if (props.mark.type === 'hr') {
      return (
        <span><span className={className}>{content}</span><br/></span>
      );
    } else {
      return (
        <span className={className}>{content}</span>
      );
    }
  }

  return null;
};

rendererComponent.propTypes = {
  node: Types.object,
  mark: Types.object
};

/**
 * Define a decorator for markdown styles.
 */

function addMarks(characters, tokens, offset) {
  let updatedOffset = offset;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (typeof token === 'string') {
      updatedOffset += token.length;
      continue;
    }

    const { content, length, type } = token;

    if (Array.isArray(content)) {
      addMarks(characters, content, updatedOffset);
    }

    const mark = Mark.create({ type });
    for (let i = updatedOffset; i < updatedOffset + length; i++) {
      let char = characters.get(i);
      let { marks } = char;

      marks = marks.add(mark);
      char = char.set('marks', marks);
      characters.set(i, char);
    }

    updatedOffset += length;
  }
}

function markdownDecorator(text, block) {
  const characters = text.characters.asMutable();
  const language = 'markdown';
  const string = text.text;
  const grammar = Prism.languages[language];
  const tokens = Prism.tokenize(string, grammar);
  addMarks(characters, tokens, 0);
  return characters.asImmutable();
}

const schema = {
  rules: [{
    match: () => true,
    decorate: markdownDecorator,
    render: rendererComponent
  }]
};
export default schema;
export const grammar = Prism.languages.markdown;
