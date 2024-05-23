import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/router';

const SavedCards: React.FC = () => {
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCards') || '[]');
    setSavedCards(saved);
  }, []);

  const removeCard = (card: any) => {
    const updatedSavedCards = savedCards.filter(savedCard => savedCard.id !== card.id);
    setSavedCards(updatedSavedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Pokémon Cards
      </Typography>
      <Grid container spacing={3}>
        {savedCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              <CardMedia
                component="img"
                image={card.images.small}
                alt={card.name}
              />
              <CardContent>
                <Typography variant="h5">{card.name}</Typography>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeCard(card)}
              sx={{ marginTop: 1 }}
            >
              Remove Card
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={() => router.push('/')}>
        Back to Home
      </Button>
    </Container>
  );
};

export default SavedCards;
