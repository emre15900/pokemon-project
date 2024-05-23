import React from "react";
import { Typography, Container } from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Next.js with TypeScript and Material-UI
      </Typography>
      <Typography variant="body1">Test</Typography>
    </Container>
  );
};

export default Home;
