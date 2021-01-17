import { createRef, useEffect } from 'react';
import highlight from 'highlight.js';

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
