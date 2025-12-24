import { useParams, useNavigate } from "react-router-dom";
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
  Paper,
  Alert,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ArrowBack,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  Receipt,
  ShoppingCart,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Download,
} from "@mui/icons-material";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  const { user } = useAuth();
  const order = getOrderById(id);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

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

  const getSteps = (status) => {
    const allSteps = [
      { label: "Order Placed", description: "Your order has been received" },
      { label: "Processing", description: "Your order is being prepared" },
      { label: "Shipped", description: "Your order is on the way" },
      { label: "Delivered", description: "Your order has been delivered" },
    ];

    if (status === "cancelled") {
      // For cancelled orders, show steps with "Cancelled" as the final step
      const cancelledSteps = [
        { label: "Order Placed", description: "Your order has been received" },
        { label: "Cancelled", description: "Your order has been cancelled" },
      ];
      // Show "Order Placed" as completed (index 0), "Cancelled" as active (index 1)
      return { steps: cancelledSteps, activeStep: 1, isCancelled: true };
    }

    switch (status) {
      case "completed":
        return { steps: allSteps, activeStep: 3, isCancelled: false };
      case "shipped":
        return { steps: allSteps, activeStep: 2, isCancelled: false };
      case "pending":
        return { steps: allSteps, activeStep: 0, isCancelled: false };
      default:
        return { steps: allSteps, activeStep: 0, isCancelled: false };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadInvoice = () => {
    // Generate invoice HTML
    const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice - ${order.orderNumber}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        .header {
            border-bottom: 3px solid #1976d2;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1976d2;
            margin: 0;
        }
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .info-section {
            flex: 1;
        }
        .info-section h3 {
            margin-top: 0;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        .total-row {
            font-weight: bold;
            font-size: 1.1em;
        }
        .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: capitalize;
            background-color: ${order.status === 'completed' ? '#4caf50' : order.status === 'cancelled' ? '#f44336' : order.status === 'shipped' ? '#2196f3' : '#ff9800'};
            color: white;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
            text-align: center;
            color: #777;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Invoice</h1>
        <p>Order Number: <strong>${order.orderNumber}</strong></p>
        <p>Invoice Date: ${formatDate(order.createdAt)}</p>
        <p>Status: <span class="status">${order.status}</span></p>
    </div>

    <div class="invoice-info">
        <div class="info-section">
            <h3>Bill To:</h3>
            <p>${user?.name || "Customer Name"}</p>
            <p>${user?.email || "customer@example.com"}</p>
            <p>123 Shopping Street<br>
            City, State 12345<br>
            United States</p>
        </div>
        <div class="info-section">
            <h3>Shipping Address:</h3>
            <p>123 Shopping Street</p>
            <p>City, State 12345</p>
            <p>United States</p>
            <p>Phone: +1 (555) 123-4567</p>
        </div>
    </div>

    <h3>Order Items</h3>
    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${order.items
              .map(
                (item) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
            `
              )
              .join("")}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" style="text-align: right;"><strong>Subtotal:</strong></td>
                <td><strong>$${order.total.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td colspan="3" style="text-align: right;"><strong>Shipping:</strong></td>
                <td><strong>Free</strong></td>
            </tr>
            <tr class="total-row">
                <td colspan="3" style="text-align: right;"><strong>Total:</strong></td>
                <td><strong>$${order.total.toFixed(2)}</strong></td>
            </tr>
        </tfoot>
    </table>

    <div class="footer">
        <p>Thank you for your business!</p>
        <p>This is an automatically generated invoice.</p>
    </div>
</body>
</html>
    `;

    // Create a blob and download
    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${order.orderNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCancelOrder = () => {
    if (order) {
      cancelOrder(order.id);
      setCancelDialogOpen(false);
      // Optionally navigate back to orders page
      // navigate("/orders");
    }
  };

  if (!order) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            Order not found
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/orders")}
            sx={{ mt: 2 }}
          >
            Back to Orders
          </Button>
        </Container>
      </Box>
    );
  }

  const { steps, activeStep, isCancelled } = getSteps(order.status);
  const canCancelOrder = order.status === "pending" || order.status === "shipped";

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/orders")}
          sx={{ mb: 3 }}
        >
          Back to Orders
        </Button>

        <Fade in={true} timeout={500}>
          <Grid container spacing={3}>
            {/* Order Header */}
            <Grid item xs={12}>
              <Card
                sx={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                        }}
                      >
                        Order #{order.orderNumber}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          Placed on {formatDate(order.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {getStatusIcon(order.status)}
                      <Chip
                        label={
                          order.status.charAt(0).toUpperCase() + order.status.slice(1)
                        }
                        color={getStatusColor(order.status)}
                        sx={{ fontWeight: 600, fontSize: "1rem", py: 2.5 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Tracking */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Order Tracking
                  </Typography>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => {
                      const isCancelledStep = step.label === "Cancelled";
                      let isCompleted = false;
                      let isError = false;
                      
                      if (isCancelled) {
                        // For cancelled orders: show "Order Placed" as completed, "Cancelled" as error
                        if (index === 0) {
                          isCompleted = true; // Order Placed is completed
                        } else if (isCancelledStep && index === activeStep) {
                          isError = true; // Cancelled step is error
                          isCompleted = true;
                        }
                      } else {
                        // For normal orders: standard logic
                        isCompleted = index <= activeStep;
                      }
                      
                      return (
                        <Step 
                          key={step.label} 
                          active={index === activeStep}
                          completed={isCompleted && !isError}
                          error={isError}
                        >
                          <StepLabel
                            optional={
                              isCompleted || index === activeStep ? (
                                <Typography 
                                  variant="caption" 
                                  color={isError ? "error" : "text.secondary"}
                                  sx={{ fontWeight: isError ? 600 : 400 }}
                                >
                                  {step.description}
                                </Typography>
                              ) : null
                            }
                            StepIconProps={{
                              sx: isError ? { color: "error.main" } : undefined,
                            }}
                          >
                            {step.label}
                          </StepLabel>
                          <StepContent>
                            {(isCompleted || index === activeStep) && (
                              <Typography 
                                variant="body2" 
                                color={isError ? "error" : "text.secondary"}
                                sx={{ fontWeight: isError ? 600 : 400 }}
                              >
                                {step.description}
                              </Typography>
                            )}
                          </StepContent>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <Box sx={{ mt: 3 }}>
                    {isCancelled ? (
                      <Alert severity="error" sx={{ borderRadius: 2 }}>
                        <Typography variant="body2">
                          <strong>Order Cancelled</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {order.cancelledAt
                            ? `This order was cancelled on ${formatDate(order.cancelledAt)}.`
                            : "This order has been cancelled."}
                          {" "}If you have any questions or need assistance, please contact our customer service.
                        </Typography>
                      </Alert>
                    ) : (
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        <Typography variant="body2">
                          <strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Order Summary
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Shipping Address
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "grey.50",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2">
                          123 Shopping Street
                          <br />
                          City, State 12345
                          <br />
                          United States
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <Phone fontSize="small" color="action" />
                        <Typography variant="body2">+1 (555) 123-4567</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2">customer@example.com</Typography>
                      </Box>
                    </Paper>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Payment Information
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "grey.50",
                      }}
                    >
                      <Typography variant="body2">
                        <strong>Payment Method:</strong> Credit Card
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Card Ending:</strong> •••• 1234
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Billing Address:</strong> Same as shipping address
                      </Typography>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Items */}
            <Grid item xs={12}>
              <Card
                sx={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Order Items ({order.items.length})
                  </Typography>
                  <List>
                    {order.items.map((item, index) => (
                      <Fade in={true} timeout={300 + index * 100} key={item.id}>
                        <ListItem
                          sx={{
                            px: 0,
                            py: 2,
                            borderBottom:
                              index < order.items.length - 1
                                ? "1px solid rgba(0,0,0,0.1)"
                                : "none",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={item.imageUrl}
                              alt={item.name}
                              variant="rounded"
                              sx={{ width: 80, height: 80, mr: 2 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="h6" fontWeight={600}>
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Unit Price: ${item.price.toFixed(2)}
                                </Typography>
                              </Box>
                            }
                          />
                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="h6" fontWeight={600} color="primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price.toFixed(2)} each
                            </Typography>
                          </Box>
                        </ListItem>
                      </Fade>
                    ))}
                  </List>

                  <Divider sx={{ my: 3 }} />

                  {/* Order Total */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body1">Subtotal:</Typography>
                        <Typography variant="body1" fontWeight={500}>
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body1">Shipping:</Typography>
                        <Typography variant="body1" fontWeight={500} color="success.main">
                          Free
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          Total:
                        </Typography>
                        <Typography variant="h5" fontWeight={700} color="primary">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        startIcon={<Download />}
                        size="large"
                        onClick={handleDownloadInvoice}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          fontSize: "1.1rem",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 16px rgba(25, 118, 210, 0.4)",
                          },
                        }}
                      >
                        Download Invoice
                      </Button>
                      {canCancelOrder && (
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          size="large"
                          onClick={() => setCancelDialogOpen(true)}
                          sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: "1.1rem",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 16px rgba(244, 67, 54, 0.4)",
                            },
                          }}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Fade>

        {/* Cancel Order Confirmation Dialog */}
        <Dialog
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          aria-labelledby="cancel-order-dialog-title"
          aria-describedby="cancel-order-dialog-description"
        >
          <DialogTitle id="cancel-order-dialog-title" sx={{ color: "error.main" }}>
            Cancel Order
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="cancel-order-dialog-description">
              Are you sure you want to cancel order <strong>{order?.orderNumber}</strong>?
              <br />
              <br />
              This action cannot be undone. If your order has already been shipped, 
              you may need to return the items separately.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setCancelDialogOpen(false)} color="inherit">
              Keep Order
            </Button>
            <Button
              onClick={handleCancelOrder}
              color="error"
              variant="contained"
              startIcon={<Cancel />}
            >
              Cancel Order
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default OrderDetail;

