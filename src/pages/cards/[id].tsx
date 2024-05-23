// pages/card/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCard } from "@/store/slices/savedCardsSlice";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";

const CardDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState<any>(null);
  const dispatch = useDispatch();
  const savedCards = useSelector(
    (state: RootState) => state.savedCards.savedCards
  );

  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.pokemontcg.io/v2/cards/${id}`)
        .then((response) => setCard(response.data.data));
    }
  }, [id]);

  if (!card) return <div>Loading...</div>;

  const isSaved = savedCards.includes(card.id);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {card.name}
      </Typography>
      <img
        src={card.images.large}
        alt={card.name}
        style={{ width: "100%", marginBottom: 20 }}
      />
      <Typography variant="body1">Type: {card.types.join(", ")}</Typography>
      <Typography variant="body1">HP: {card.hp}</Typography>
      {card.abilities && (
        <Typography variant="body1">
          Abilities:{" "}
          {card.abilities.map((ability: any) => ability.name).join(", ")}
        </Typography>
      )}
      <Button
        onClick={() => dispatch(toggleCard(card.id))}
        variant="contained"
        color={isSaved ? "secondary" : "primary"}
        style={{ marginTop: 20 }}
      >
        {isSaved ? "Remove Card" : "Save Card"}
      </Button>
    </Container>
  );
};

export default CardDetail;
