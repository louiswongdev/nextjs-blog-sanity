import React from 'react';
import Toggle from 'react-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ThemeToggle({ onChange }) {
  return (
    <label>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={onChange}
      />
    </label>
  );
}

export default ThemeToggle;
