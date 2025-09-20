interface Card {
  id: string;
  clicks: number;
  first_click: Date | null;
}

type Sort = 'most_clicked' | 'least_clicked' | 'first_clicked' | 'last_clicked';
