import React from 'react';

const cardSetFilter = (props) => {
  const renderDropdownMenuItem = (cardSet) => {
    return (
      <div key={cardSet.id} className="form-check">
        <input
          id={`filter-${cardSet.abbreviation}`}
          type="checkbox"
          className="form-check-input"
          onChange={props.onFilterCardSet}
          value={cardSet.id}
        />
        <label
          className="form-check-label"
          htmlFor={`filter-${cardSet.abbreviation}`}
        >
          {cardSet.abbreviation}
        </label>
      </div>
    );
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        Filter Card Sets
      </button>
      <div className="dropdown-menu">
        <form className="pl-2">
          {props.cardSets.map(cardSet => renderDropdownMenuItem(cardSet))}
        </form>
      </div>
    </div>
  )
}

export default cardSetFilter;
