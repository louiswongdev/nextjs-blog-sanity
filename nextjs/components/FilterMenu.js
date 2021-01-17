import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LIST_VIEW_ICONS = ['list', 'border-all'];

function FilterMenu({ onChange, filter }) {
  return (
    <div className="filtering-menu mb-2">
      <FontAwesomeIcon
        className="clickable hoverable"
        icon={LIST_VIEW_ICONS[filter.view.list]}
        size="2x"
        onClick={() => {
          onChange('view', { list: +!filter.view.list });
        }}
      />
    </div>
  );
}

export default FilterMenu;
