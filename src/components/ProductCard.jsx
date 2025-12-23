import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
  Fade,
  Grow,
} from "@mui/material";
import { AddShoppingCart, CheckCircle } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Grow in={true} timeout={300 + index * 100}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
            "& .product-image": {
              transform: "scale(1.1)",
            },
            "& .add-to-cart-btn": {
              backgroundColor: "primary.dark",
              transform: "scale(1.05)",
            },
          },
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: { xs: 200, sm: 220, md: 250 },
            backgroundColor: "grey.100",
          }}
        >
          <Fade in={imageLoaded && !imageError} timeout={500}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt={product.name}
              className="product-image"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
                // Fallback to a placeholder service
                setImageUrl(
                  `https://via.placeholder.com/800x600/1976d2/ffffff?text=${encodeURIComponent(
                    product.name
                  )}`
                );
              }}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </Fade>
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "grey.200",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  border: "3px solid",
                  borderColor: "primary.main",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Loading image...
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            {product.stock > 0 ? (
              <Chip
                label="In Stock"
                color="success"
                size="small"
                sx={{
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            ) : (
              <Chip
                label="Out of Stock"
                color="error"
                size="small"
                sx={{
                  fontWeight: "bold",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            )}
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: { xs: "3em", sm: "3em" },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.5em",
            }}
          >
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              ${product.price?.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ p: { xs: 1, sm: 1.5 }, pt: 0 }}>
          <Button
            size="medium"
            variant="contained"
            startIcon={addedToCart ? <CheckCircle /> : <AddShoppingCart />}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            fullWidth
            className="add-to-cart-btn"
            sx={{
              py: { xs: 1, sm: 1.25 },
              transition: "all 0.3s ease",
              fontWeight: 600,
              textTransform: "none",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {addedToCart ? "Added!" : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default ProductCard;
