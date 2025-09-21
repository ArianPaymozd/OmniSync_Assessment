import { FC } from "react";
import './Card.css';
import { getDateTime } from "./helpers";

const Card: FC<{ card: Card; handleIncrementClick: (id: string) => void }> = ({ card, handleIncrementClick }) => {

  return (
    <div className="card" onClick={() => handleIncrementClick(card.id)} key={card.id}>
        <h2>{card.id}</h2>
        <p className="card-clicks">Clicks: {card.clicks}</p>
        <p className="card-first-click">{getDateTime(card.first_click)}</p>
    </div>
  );
}

export default Card;
