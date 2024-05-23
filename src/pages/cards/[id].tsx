import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";

import { toast } from "react-toastify";

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
    toast.success("Card saved!");
  };

  const removeCard = () => {
    const updatedSavedCards = savedCards.filter(
      (savedCard) => savedCard.id !== card.id
    );
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
    toast.error("Card removed!");
  };

  const isCardSaved = () => {
    return savedCards.some((savedCard) => savedCard.id === card.id);
  };

  if (!card) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mt: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#ffffff", mt: 2, mb: 2, fontWeight: 600 }}
        >
          Pokémon Card Details
        </Typography>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            padding: "10px",
            background: "#2D3748",
            maxWidth: 390,
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0 0 3px #10f110",
              transition: "all 0.3s",
              background: "#454f60",
            },
          }}
        >
          <CardMedia
            component="img"
            image={card.images.large}
            alt={card.name}
            sx={{ maxWidth: 370 }}
          />
          <CardContent sx={{ padding: "0 !important", mt: 2, mb: 1 }}>
            <Typography
              variant="h4"
              sx={{ color: "#ffffff", mb: 1, fontWeight: 600 }}
            >
              {card.name}
            </Typography>
            <Typography sx={{ color: "#ffffff", mb: 1, fontWeight: 500 }}>
              <strong>Type:</strong> {card.types.join(", ")}
            </Typography>
            <Typography sx={{ color: "#ffffff", mb: 1, fontWeight: 500 }}>
              <strong>HP:</strong> {card.hp}
            </Typography>
            <Typography sx={{ color: "#ffffff", mb: 1, fontWeight: 500 }}>
              <strong>Abilities:</strong>{" "}
              {card?.abilities?.map((ability: any) => ability.name).join(", ")}
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color={isCardSaved() ? "secondary" : "primary"}
          onClick={() => (isCardSaved() ? removeCard() : saveCard())}
          sx={{
            marginTop: 1,
            width: "100%",
            borderRadius: "10px",
            fontWeight: 600,
            maxWidth: 390,
          }}
        >
          {isCardSaved() ? "Remove Card" : "Save Card"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push("/")}
          sx={{
            marginTop: 1,
            borderRadius: "10px",
            fontWeight: 600,
            padding: "7px 2.8rem",
            mb: 5,
            borderColor: "#ffffff",
            color: "#ffffff",
            maxWidth: 390,
            width: "100%",
          }}
        >
          Back to Home
        </Button>
      </Grid>
    </Container>
  );
};

export default CardDetail;
