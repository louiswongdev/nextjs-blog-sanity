import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

import HighlightCode from './HighlightCode';

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => (
      <HighlightCode language={language}>
        {code}
        <div className="code-filename">{filename}</div>
      </HighlightCode>
    ),
  },
};

function BlogContent({ content }) {
  return (
    <BlockContent
      blocks={content}
      imageOptions={{ w: 320, h: 240, fit: 'max' }}
      serializers={serializers}
    />
  );
}

export default BlogContent;
