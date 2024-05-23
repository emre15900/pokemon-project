import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SavedCards: React.FC = () => {
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCards") || "[]");
    setSavedCards(saved);
    setIsLoading(false);
  }, []);

  const removeCard = (card: any) => {
    const updatedSavedCards = savedCards.filter(
      (savedCard) => savedCard.id !== card.id
    );
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
    toast.error("Card removed!");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Saved Pokémon Cards
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : savedCards.length > 0 ? (
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
      ) : (
        <Typography variant="body1">No saved cards</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default SavedCards;
