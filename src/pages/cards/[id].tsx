import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";

const CardDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState<any>(null);
  const [savedCards, setSavedCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `https://api.pokemontcg.io/v2/cards/${id}`
        );
        setCard(response.data.data);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchCard();
  }, [id]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCards") || "[]");
    setSavedCards(saved);
  }, []);

  const saveCard = () => {
    const updatedSavedCards = [...savedCards, card];
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
  };

  const removeCard = () => {
    const updatedSavedCards = savedCards.filter(
      (savedCard) => savedCard.id !== card.id
    );
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
  };

  const isCardSaved = () => {
    return savedCards.some((savedCard) => savedCard.id === card.id);
  };

  if (!card) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia component="img" image={card.images.large} alt={card.name} />
        <CardContent>
          <Typography variant="h4">{card.name}</Typography>
          <Typography>Type: {card.types.join(", ")}</Typography>
          <Typography>HP: {card.hp}</Typography>
          <Typography>
            Abilities:{" "}
            {card?.abilities?.map((ability: any) => ability.name).join(", ")}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color={isCardSaved() ? "secondary" : "primary"}
        onClick={() => (isCardSaved() ? removeCard() : saveCard())}
        sx={{ marginTop: 2 }}
      >
        {isCardSaved() ? "Remove Card" : "Save Card"}
      </Button>
    </Container>
  );
};

export default CardDetail;
