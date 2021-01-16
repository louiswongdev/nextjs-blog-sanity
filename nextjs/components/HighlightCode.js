// import Highlight from 'react-highlight';

// function HighlightCode({ children, language }) {
//   return <Highlight className={language}>{children}</Highlight>;
// }

// export default HighlightCode;

// components/HighlightCode.js
import { createRef, useEffect } from 'react';
import highlight from 'highlight.js';
import { findDOMNode } from 'react-dom';

function HighlightCode({ children, language }) {
  const codeRef = createRef();

  useEffect(() => {
    highlight.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {children}
      </code>
    </pre>
  );
}

export default HighlightCode;
