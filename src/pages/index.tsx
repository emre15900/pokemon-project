import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";

const Home: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=6`
        );
        setCards((prevCards) => [...prevCards, ...response.data.data]);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Pokémon Cards
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={4} md={3} key={card.id}>
            <Link href={`/cards/${card.id}`} passHref>
              <Card>
                <CardMedia
                  component="img"
                  image={card.images.small}
                  alt={card.name}
                />
                <CardContent>
                  <Typography variant="subtitle1">{card.name}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={loadMore}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </Container>
  );
};

export default Home;
