import Highlight from 'react-highlight';

function HighlightCode({ children, language }) {
  return <Highlight className={language}>{children}</Highlight>;
}

export default HighlightCode;
