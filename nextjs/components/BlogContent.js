import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

import HighlightCode from './HighlightCode';
import { urlFor } from 'lib/api';

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => (
      <HighlightCode language={language}>
        {code}
        <div className="code-filename">{filename}</div>
      </HighlightCode>
    ),
    image: ({ node: { asset, alt, position = 'center' } }) => {
      let style = {};
      position === 'left'
        ? (style = { ...style, float: position, marginRight: '30px' })
        : position === 'right'
        ? (style = { ...style, float: position, marginLeft: '30px' })
        : style;

      return (
        <div className="blog-image" style={{ ...style }}>
          <img src={urlFor(asset).height(300).fit('max').url()} />
          <div className="image-alt">{alt}</div>
        </div>
      );
    },
  },
};

function BlogContent({ content }) {
  return <BlockContent blocks={content} serializers={serializers} />;
}

export default BlogContent;
