/**
 * This component generate a card for each search result given to it
 */

import React from 'react';

const FigureCard = (props) => {
  return (
    <section className="modalCard">
      <input
        type="radio"
        key={props.path}
        value={props.path}
        name="radioElem"
        className="inputElem"
        onChange={(e) => props.selectedFigure(props.figureDetails)}
        id={props.forInputKey}
      />{props.title}
    </section>
  );
}

export default FigureCard;
