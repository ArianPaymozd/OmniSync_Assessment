export const sortOptions = {
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

  export const sortCards = (cards: Card[], order: Sort) => {
    const sortedCards = [...cards];
    sortedCards.sort(sortOptions[order].sortFn);
    return sortedCards;
  }

  export const getDateTime = (timestamp: Date | null) => {
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