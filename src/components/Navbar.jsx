import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
  useMediaQuery,
  useTheme,
  Fade,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Menu,
  Close,
  Home,
  Store,
  ShoppingBag,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItemCount = getCartItemCount();

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <Home /> },
    { text: "Products", path: "/products", icon: <Store /> },
    { text: "Cart", path: "/cart", icon: <ShoppingCart /> },
  ];

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🛍️ E-Commerce Store
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick(item.path)}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive(item.path)
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateX(8px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 40,
                }}
              >
                {item.path === "/cart" ? (
                  <Badge
                    badgeContent={cartItemCount}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        animation:
                          cartItemCount > 0
                            ? "pulse 1s ease-in-out infinite"
                            : "none",
                      },
                    }}
                  >
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 700 : 400,
                  fontSize: "1.1rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          width: "100%",
          maxWidth: "100%",
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            py: { xs: 0.5, sm: 1 },
            maxWidth: "100%",
            width: "100%",
            px: { xs: 2, sm: 3, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Fade in={true} timeout={500}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                transition: "transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              🛍️ E-Commerce Store
            </Typography>
          </Fade>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{
                fontSize: "1rem",
                fontWeight: isActive("/") ? 700 : 400,
                backgroundColor: isActive("/")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/products"
              startIcon={<Store />}
              sx={{
                fontSize: "1rem",
                fontWeight: isActive("/products") ? 700 : 400,
                backgroundColor: isActive("/products")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              startIcon={
                <Badge
                  badgeContent={cartItemCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      animation:
                        cartItemCount > 0
                          ? "pulse 1s ease-in-out infinite"
                          : "none",
                    },
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.2)" },
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              }
              onClick={() => navigate("/cart")}
              sx={{
                fontSize: "1rem",
                fontWeight: isActive("/cart") ? 700 : 400,
                backgroundColor: isActive("/cart")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              Cart
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <Badge
                badgeContent={cartItemCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    animation:
                      cartItemCount > 0
                        ? "pulse 1s ease-in-out infinite"
                        : "none",
                  },
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "rotate(90deg)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
