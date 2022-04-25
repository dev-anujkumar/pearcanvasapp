/**
 * This component generate a card for each search result given to it
 */

import React from 'react';

const FigureCard = (props) => {
  return (
    <section className="modalCard">
      <div className="modalInputField">
        <div className="modalInput">
          <input
            type="radio"
            key={props.path}
            value={props.path}
            name="radioElem"
            onChange={(e) => props.selectedFigure(props.figureDetails)}
            id={props.forInputKey}
          />
        </div>
        <div className="modalAssetDetails">
          {props.title ? <div className="modalText">{props.title}</div> : null}
          {props.caption ? <div className="modalCaption">{`Caption: ${props.caption}`}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default FigureCard;
