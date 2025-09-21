import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState<Card[]>([]);
  const [sortOrder, setSortOrder] = useState<Sort>('most_clicked');

  const sortOptions = {
    'most_clicked': {
      label: 'Most Clicked',
      sortFn: (a: Card, b: Card) => {
        if (a.clicks !== b.clicks) {
          return b.clicks - a.clicks;
        } else {
          return parseInt(a.id) - parseInt(b.id);
        }
      }
    },
    'least_clicked': {
      label: 'Least Clicked',
      sortFn: (a: Card, b: Card) => {
        if (a.clicks !== b.clicks) {
          return a.clicks - b.clicks;
        } else {
          return parseInt(a.id) - parseInt(b.id);
        }
      }
    },
    'first_clicked': {
      label: 'First Clicked',
      sortFn: (a: Card, b: Card) => {
        if (a.first_click && b.first_click) {
          return new Date(a.first_click).getTime() - new Date(b.first_click).getTime();
        } else if (a.first_click) {
          return -1;
        } else if (b.first_click) {
          return 1;
        } else {
          return parseInt(a.id) - parseInt(b.id);
        }
      }
    },
    'last_clicked': {
      label: 'Last Clicked',
      sortFn: (a: Card, b: Card) => {
        if (a.first_click && b.first_click) {
          return new Date(b.first_click).getTime() - new Date(a.first_click).getTime();
        } else if (a.first_click) {
          return -1;
        } else if (b.first_click) {
          return 1; 
        } else {
          return parseInt(a.id) - parseInt(b.id);
        }
      }
    }
  }

  const getDateTime = (timestamp: Date | null) => {
    if (!timestamp) return `Not Clicked Yet`;
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
    sortedCards.sort(sortOptions[order].sortFn);
    return sortedCards;
  }

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

  const handleClearClicks = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards/clear`, {
        method: 'POST',
      });
      if (response.ok) {
        const clearedCards = await response.json();
        setData(sortCards(clearedCards, sortOrder));
      }
    } catch (error) {
      console.error('Error clearing clicks:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <button onClick={() => handleClearClicks()}>Clear Clicks</button>
      <select 
        value={sortOrder} 
        onChange={(e) => {
          const newSort = e.target.value as Sort;
          setSortOrder(newSort);
          setData(sortCards(data, newSort));
        }}
      >
        {Object.entries(sortOptions).map(([key, option]) => (
          <option key={key} value={key}>{option.label}</option>
        ))}
      </select>
      <hr />
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
