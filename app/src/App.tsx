import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
import { sortCards, sortOptions } from './helpers';

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
      <div className="input-container">
        <button className='input' onClick={() => handleClearClicks()}>Clear Clicks</button>
        <select 
          className='input'
          value={sortOrder} 
          onChange={(e) => {
            const newSort = e.target.value as Sort;
            setSortOrder(newSort);
            setData(sortCards(data, newSort));
          }}
        >
          {Object.entries(sortOptions).map(([key, option]) => (
            <option className="option" key={key} value={key}>{option.label}</option>
          ))}
        </select>
      </div>
      <hr />
      <div className="card-grid">
        {data.map((card) => (
          <Card card={card} handleIncrementClick={handleIncrementClick}/>
        ))}
      </div>
      
    </div>
  );
}

export default App;
