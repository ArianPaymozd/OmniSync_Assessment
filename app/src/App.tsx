import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<Card[]>([]);
  const [sortOrder, setSortOrder] = useState<Sort>('most_clicked');
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards`)
      if (response.ok) {
        const d = await response.json();
        setData(sortCards(JSON.parse(d), sortOrder));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleIncrementClick = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        const updatedCard = await response.json();
        setData((prevData) =>
          sortCards(prevData.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          ), sortOrder)
        );
      }
    } catch (error) {
      console.error('Error incrementing click:', error);
    }
  }

  const getDateTime = (timestamp: Date | null) => {
    if (!timestamp) return `N/A`;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `
      ${year}-${month}-${day} 
      ${hours > 12 
        ? hours - 12 
        : hours
      }
      :${minutes}:${seconds} 
      ${hours >= 12 ? 'PM' : 'AM'}
    `;
  }

  const sortCards = (cards: Card[], order: Sort) => {
    const sortedCards = [...cards];
    switch (order) {
      case 'most_clicked':
        sortedCards.sort((a, b) => b.clicks - a.clicks);
        break;
      case 'least_clicked':
        sortedCards.sort((a, b) => a.clicks - b.clicks);
        break;
      case 'first_clicked':
        sortedCards.sort((a, b) => {
          if (a.first_click && b.first_click) {
            return new Date(a.first_click).getTime() - new Date(b.first_click).getTime();
          } else if (a.first_click) {
            return -1;
          } else if (b.first_click) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 'last_clicked':
        sortedCards.sort((a, b) => {
          if (a.first_click && b.first_click) {
            return new Date(b.first_click).getTime() - new Date(a.first_click).getTime();
          } else if (a.first_click) {
            return 1;
          } else if (b.first_click) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      default:
        break;
    }
    return sortedCards;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {data.length > 0 ? data.map((card) => (
        <div onClick={() => handleIncrementClick(card.id)} key={card.id}>
          <h2>Card ID: {card.id}</h2>
          <p>Clicks: {card.clicks}</p>
          <p>First Click: {getDateTime(card.first_click)}</p>
        </div>
      )): []}
    </div>
  );
}

export default App;
