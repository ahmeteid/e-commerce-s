import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Fade,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  ArrowBack,
  Receipt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext";

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" />;
      case "shipped":
        return <LocalShipping color="primary" />;
      case "pending":
        return <Pending color="warning" />;
      case "cancelled":
        return <Cancel color="error" />;
      default:
        return <Pending />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "shipped":
        return "primary";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (orders.length === 0) {
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
                My Orders
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
                You haven't placed any orders yet.
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
                Start Shopping
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mr: "auto" }}
          >
            Back
          </Button>
        </Box>

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
          My Orders
        </Typography>

        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} key={order.id}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                        flexWrap: "wrap",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          Order #{order.orderNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Placed on {formatDate(order.createdAt)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estimated delivery: {formatDate(order.estimatedDelivery)}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {getStatusIcon(order.status)}
                        <Chip
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          color={getStatusColor(order.status)}
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Items ({order.items.length})
                    </Typography>
                    <List>
                      {order.items.map((item) => (
                        <ListItem key={item.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar
                              src={item.imageUrl}
                              alt={item.name}
                              variant="rounded"
                              sx={{ width: 50, height: 50 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(
                              2
                            )}`}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        Total: ${order.total.toFixed(2)}
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Receipt />}
                        size="small"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        sx={{
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Orders;

