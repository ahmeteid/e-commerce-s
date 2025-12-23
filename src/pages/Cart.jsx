import { Fade, Grow } from "@mui/material";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import { Delete, Add, Remove, ShoppingCartCheckout } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real application, this would navigate to checkout page
    alert("Checkout functionality would be implemented here!");
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
          <Fade in={true} timeout={500}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                  mb: 2,
                }}
              >
                Shopping Cart
              </Typography>
              <Alert
                severity="info"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  maxWidth: 500,
                  mx: "auto",
                }}
              >
                Your cart is empty. Start shopping to add items!
              </Alert>
              <Button
                variant="contained"
                onClick={() => navigate("/products")}
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                Browse Products
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            mb: { xs: 2, sm: 3 },
          }}
        >
          Shopping Cart
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <Grow in={true} timeout={300 + index * 100} key={item.id}>
                <Card
                  sx={{
                    mb: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Box
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height={{ xs: 150, sm: 120 }}
                            image={item.imageUrl || "/placeholder-image.jpg"}
                            alt={item.name}
                            sx={{
                              objectFit: "cover",
                              width: "100%",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price?.toFixed(2)} each
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            justifyContent: { xs: "flex-start", sm: "center" },
                            mb: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "error.light",
                                color: "error.contrastText",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <Typography
                            variant="body1"
                            sx={{
                              minWidth: 30,
                              textAlign: "center",
                              fontWeight: 600,
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            sx={{
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "success.light",
                                color: "success.contrastText",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <Add />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                              ml: 1,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.2) rotate(90deg)",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 1,
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                            fontWeight: 600,
                            color: "primary.main",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grow>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={800}>
              <Card
                sx={{
                  position: { md: "sticky" },
                  top: { md: 20 },
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography>Subtotal:</Typography>
                    <Typography fontWeight={500}>
                      ${getCartTotal().toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Typography>Shipping:</Typography>
                    <Typography fontWeight={500} color="success.main">
                      Free
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      Total:
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      ${getCartTotal().toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCartCheckout />}
                    onClick={handleCheckout}
                    sx={{
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 16px rgba(25, 118, 210, 0.4)",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
