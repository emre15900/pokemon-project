import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tooltip,
  CircularProgress,
  Chip,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";

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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCards") || "[]");
    setSavedCards(saved);
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const saveCard = (card: any) => {
    const updatedSavedCards = [...savedCards, card];
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
    toast.success("Card saved!");
  };

  const isCardSaved = (card: any) => {
    return savedCards.some((savedCard) => savedCard.id === card.id);
  };

  const removeCard = (card: any) => {
    const updatedSavedCards = savedCards.filter(
      (savedCard) => savedCard.id !== card.id
    );
    setSavedCards(updatedSavedCards);
    localStorage.setItem("savedCards", JSON.stringify(updatedSavedCards));
    toast.error("Card removed!");
  };

  const removeAllCards = () => {
    setSavedCards([]);
    localStorage.removeItem("savedCards");
    toast.error("All cards removed!");
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#2D3748" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pokémon Cards
          </Typography>
          <Tooltip
            title={
              <Grid>
                <Grid sx={{ maxHeight: 500, overflow: "scroll" }}>
                  {savedCards.length > 0 ? (
                    savedCards.map((card) => (
                      <Grid
                        key={card.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 1,
                          mb: 2,
                          background: "#2D3748",
                          padding: "10px",
                          borderRadius: "10px",
                          "&:hover": {
                            cursor: "pointer",
                            transition: "all 0.3s",
                            background: "#454f60",
                          },
                        }}
                      >
                        <Link href="/saved">
                          <img
                            src={card.images.small}
                            alt={card.name}
                            width={70}
                          />
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ mt: 1 }}
                          >
                            {card.name}
                          </Typography>
                        </Link>
                        <Tooltip title="Remove Card">
                          <IconButton
                            onClick={() => removeCard(card)}
                            sx={{
                              "&:hover": {
                                background: "#9a9a9a",
                              },
                            }}
                          >
                            <CloseIcon
                              sx={{
                                color: "#ffffff",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2">No saved cards</Typography>
                  )}
                </Grid>

                {savedCards.length > 0 && (
                  <Button
                    onClick={removeAllCards}
                    variant="contained"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      borderRadius: "10px",
                      textTransform: "none",
                      mb: 1.5,
                      mt: 1.5,
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Remove All Cards
                    </Typography>
                    <Tooltip title="Remove All Card">
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: "#9a9a9a",
                          },
                        }}
                      >
                        <DeleteIcon
                          sx={{
                            color: "#ffffff",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Button>
                )}
              </Grid>
            }
          >
            <IconButton color="inherit" onClick={() => router.push("/saved")}>
              <Badge badgeContent={savedCards.length} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {cards.map((card) => (
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
                color={isCardSaved(card) ? "secondary" : "primary"}
                onClick={() =>
                  isCardSaved(card) ? removeCard(card) : saveCard(card)
                }
                sx={{
                  marginTop: 1,
                  width: "100%",
                  borderRadius: "10px",
                  fontWeight: 600,
                }}
              >
                {isCardSaved(card) ? "Remove Card" : "Save Card"}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={loadMore}
            disabled={isLoading}
            sx={{
              marginTop: 1,
              borderRadius: "10px",
              fontWeight: 600,
              padding: "8px 3rem",
            }}
          >
            {isLoading ? <CircularProgress color="primary" /> : "Load More"}
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
