import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  CircularProgress,
  Fade,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  ShoppingCartCheckout,
  Payment,
} from "@mui/icons-material";

const CheckoutDialog = ({ open, onClose, cartItems, total, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsConfirmed(true);
    // Wait a bit then call onConfirm
    setTimeout(() => {
      onConfirm();
      setIsConfirmed(false);
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        },
      }}
    >
      {!isConfirmed ? (
        <>
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingCartCheckout color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Confirm Your Order
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              Please review your order before completing the payment.
            </Alert>

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Order Summary
            </Typography>
            <List sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={item.imageUrl}
                      alt={item.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity} × $${item.price.toFixed(
                      2
                    )}`}
                  />
                  <Typography variant="body1" fontWeight={600}>
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
                mb: 1,
              }}
            >
              <Typography>Subtotal:</Typography>
              <Typography fontWeight={500}>${total.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
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
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Total:
              </Typography>
              <Typography variant="h6" color="primary" fontWeight={700}>
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 2 }}>
            <Button
              onClick={handleCancel}
              startIcon={<Cancel />}
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              startIcon={isProcessing ? <CircularProgress size={20} /> : <Payment />}
              disabled={isProcessing}
              sx={{
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 16px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              {isProcessing ? "Processing..." : "Complete Payment"}
            </Button>
          </DialogActions>
        </>
      ) : (
        <Fade in={isConfirmed}>
          <Box sx={{ textAlign: "center", p: 4 }}>
            <CheckCircle
              sx={{
                fontSize: 80,
                color: "success.main",
                mb: 2,
              }}
            />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your order has been confirmed and will be processed shortly.
            </Typography>
            <CircularProgress size={24} sx={{ mt: 2 }} />
          </Box>
        </Fade>
      )}
    </Dialog>
  );
};

export default CheckoutDialog;

