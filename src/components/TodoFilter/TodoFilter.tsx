import React, { Dispatch, SetStateAction } from 'react';
import { StatusFilter } from '../../types/StatusFilter';
import { capitalizeString } from '../../utils/capitalizeString';
import classNames from 'classnames';

type Props = {
  filterValue: StatusFilter;
  setFilterValue: Dispatch<SetStateAction<StatusFilter>>;
};

export const TodoFilter: React.FC<Props> = props => {
  const { filterValue, setFilterValue } = props;

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(StatusFilter).map(value => {
        return (
          <a
            key={value}
            href={`#/${value === StatusFilter.All ? '' : value}`}
            className={classNames('filter__link', {
              selected: value === filterValue,
            })}
            data-cy={`FilterLink${capitalizeString(value)}`}
            onClick={() => setFilterValue(value)}
          >
            {capitalizeString(value)}
          </a>
        );
      })}
    </nav>
  );
};
