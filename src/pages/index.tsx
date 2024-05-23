import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Container, Grid, Card, CardMedia, CardContent, Button, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=6`);
        setCards(prevCards => [...prevCards, ...response.data.data]);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [page]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCards') || '[]');
    setSavedCards(saved);
  }, []);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const saveCard = (card: any) => {
    const updatedSavedCards = [...savedCards, card];
    setSavedCards(updatedSavedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
  };

  const isCardSaved = (card: any) => {
    return savedCards.some(savedCard => savedCard.id === card.id);
  };

  const removeCard = (card: any) => {
    const updatedSavedCards = savedCards.filter(savedCard => savedCard.id !== card.id);
    setSavedCards(updatedSavedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedSavedCards));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pokémon Cards
          </Typography>
          <Tooltip
            title={
              <div>
                {savedCards.map((card) => (
                  <div key={card.id}>
                    <img src={card.images.small} alt={card.name} width={50} />
                    <Typography variant="body2">{card.name}</Typography>
                  </div>
                ))}
              </div>
            }
          >
            <IconButton color="inherit" onClick={() => router.push('/saved')}>
              <Badge badgeContent={savedCards.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Link href={`/card/${card.id}`} passHref>
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
              </Link>
              <Button
                variant="contained"
                color={isCardSaved(card) ? "secondary" : "primary"}
                onClick={() => isCardSaved(card) ? removeCard(card) : saveCard(card)}
                sx={{ marginTop: 1 }}
              >
                {isCardSaved(card) ? "Remove Card" : "Save Card"}
              </Button>
            </Grid>
          ))}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={loadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Home;
