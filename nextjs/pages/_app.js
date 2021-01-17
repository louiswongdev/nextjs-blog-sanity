import { library, config } from '@fortawesome/fontawesome-svg-core';
import { faBorderAll, faList } from '@fortawesome/free-solid-svg-icons';

library.add(faList, faBorderAll);
config.autoAddCss = false;

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/atom-one-dark.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
