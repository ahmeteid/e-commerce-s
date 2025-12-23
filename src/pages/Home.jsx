import {
  Fade,
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading, error } = useProducts();

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  if (loading) {
    return (
      <Container
        sx={{
          py: 8,
          textAlign: "center",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3, color: "text.secondary" }}>
          Loading products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ mb: { xs: 3, sm: 4, md: 5 }, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                mb: 2,
                background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome to Our Store
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Discover amazing products at great prices
            </Typography>
          </Box>
        </Fade>

        <Fade in={true} timeout={1000}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: { xs: 2, sm: 3 },
              fontWeight: 600,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            Featured Products
          </Typography>
        </Fade>

        {featuredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products available at the moment.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} index={index} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
