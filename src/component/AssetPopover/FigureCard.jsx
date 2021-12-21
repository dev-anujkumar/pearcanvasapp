/**
 * This component generate a card for each search result given to it
 */

import React from 'react';

const FigureCard = (props) => {
  return (
    <section className="modalCard">
      <div className="modalInputField">
      <div className="modalInput"><input
        type="radio"
        key={props.path}
        value={props.path}
        name="radioElem"
        onChange={(e) => props.selectedFigure(props.figureDetails)}
        id={props.forInputKey}
      />
      </div>
      <div className="modalText">{props.title}</div>
      </div>
    </section>
  );
}

export default FigureCard;
