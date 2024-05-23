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
  Chip,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Link from "next/link";

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "#ffffff", mt: 2, mb: 2, fontWeight: 600 }}
      >
        Saved Pokémon Cards
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : savedCards.length > 0 ? (
        <Grid container spacing={3}>
          {savedCards.map((card) => (
            <Grid item xs={12} sm={4} md={3} key={card.id}>
              <Link href={`/cards/${card.id}`} passHref>
                <Card
                  sx={{
                    borderRadius: "10px",
                    padding: "10px",
                    background: "#2D3748",
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
                    image={card.images.small}
                    alt={card.name}
                  />
                  <CardContent sx={{ padding: "0 !important", mt: 3, mb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#ffffff", fontSize: 18, fontWeight: 600 }}
                      >
                        {truncateText(card.name, 16)}
                      </Typography>
                      <Chip
                        label={card.types.join(", ")}
                        variant="outlined"
                        sx={{ color: "#10f110", borderColor: "#10f110" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeCard(card)}
                sx={{
                  marginTop: 1,
                  width: "100%",
                  borderRadius: "10px",
                  fontWeight: 600,
                }}
              >
                Remove Card
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textAlign: "center",
            mt: 10,
          }}
        >
          <img
            src="/images/empy.jpg"
            width={300}
            alt="empty"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="h6" sx={{ color: "#ffffff" }}>
            No saved cards!
          </Typography>
        </Box>
      )}
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{
            marginTop: 1,
            borderRadius: "10px",
            fontWeight: 600,
            padding: "8px 3rem",
            mb: 5,
          }}
        >
          Back to Home
        </Button>
      </Grid>
    </Container>
  );
};

export default SavedCards;
