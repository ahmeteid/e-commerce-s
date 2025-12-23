import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CardMedia,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading } = useProducts();
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const product = getProductById(id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Product not found</Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/products")}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardMedia
              component="img"
              height={{ xs: 300, sm: 400, md: 500 }}
              image={
                imageError
                  ? `https://via.placeholder.com/800x600/1976d2/ffffff?text=${encodeURIComponent(
                      product.name
                    )}`
                  : product.imageUrl || "/placeholder-image.jpg"
              }
              alt={product.name}
              onError={() => {
                if (!imageError) {
                  setImageError(true);
                }
              }}
              sx={{
                objectFit: "cover",
                width: "100%",
                transition: "transform 0.5s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {product.name}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                color={product.stock > 0 ? "success" : "error"}
              />
            </Box>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              gutterBottom
            >
              ${product.price?.toFixed(2)}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mt: 2, mb: 3 }}>
              {product.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Stock Available: {product.stock} units
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(25, 118, 210, 0.4)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
