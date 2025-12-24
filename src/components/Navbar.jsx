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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ShoppingCart,
  Menu as MenuIcon,
  Close,
  Home,
  Store,
  ShoppingBag,
  Receipt,
  Login,
  PersonAdd,
  Logout,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const menuItems = [
    { text: "Home", path: "/", icon: <Home /> },
    { text: "Products", path: "/products", icon: <Store /> },
    { text: "Cart", path: "/cart", icon: <ShoppingCart /> },
    ...(isAuthenticated
      ? [{ text: "Orders", path: "/orders", icon: <ShoppingBag /> }]
      : []),
  ];

  const drawer = (
    <Box
      sx={{
        width: { xs: 260, sm: 280 },
        height: "100%",
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 1.5, sm: 2 },
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          🛍️ E-Commerce Store
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          size="small"
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
      <List sx={{ pt: 2, flexGrow: 1, overflowY: "auto" }}>
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
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 1 }} />
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavClick("/login")}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive("/login")
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
                  <Login />
                </ListItemIcon>
                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    fontWeight: isActive("/login") ? 700 : 400,
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavClick("/signup")}
                sx={{
                  mx: 1,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActive("/signup")
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
                  <PersonAdd />
                </ListItemIcon>
                <ListItemText
                  primary="Sign Up"
                  primaryTypographyProps={{
                    fontWeight: isActive("/signup") ? 700 : 400,
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
              }}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 2,
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
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
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
            py: { xs: 0.5, sm: 0.75, md: 1 },
            maxWidth: "100%",
            width: "100%",
            px: { xs: 1.5, sm: 2, md: 2, lg: 3 },
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
            minHeight: { xs: "56px", sm: "64px" },
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
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                  lg: "1.5rem",
                },
                transition: "transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: { xs: 0.5, sm: 1 },
                flexShrink: 0,
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                component="span"
                sx={{ display: { xs: "block", sm: "block" } }}
              >
                🛍️
              </Box>
              <Box
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { sm: "120px", md: "150px", lg: "none" },
                }}
              >
                E-Commerce Store
              </Box>
            </Typography>
          </Fade>

          {/* Desktop/Tablet Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { md: 0.5, lg: 1 },
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<Home />}
              sx={{
                fontSize: { md: "0.875rem", lg: "1rem" },
                fontWeight: isActive("/") ? 700 : 400,
                backgroundColor: isActive("/")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: { md: 1, lg: 2 },
                py: 1,
                minWidth: { md: "auto", lg: "64px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                component="span"
                sx={{ display: { md: "none", lg: "inline" } }}
              >
                Home
              </Box>
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/products"
              startIcon={<Store />}
              sx={{
                fontSize: { md: "0.875rem", lg: "1rem" },
                fontWeight: isActive("/products") ? 700 : 400,
                backgroundColor: isActive("/products")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: { md: 1, lg: 2 },
                py: 1,
                minWidth: { md: "auto", lg: "64px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                component="span"
                sx={{ display: { md: "none", lg: "inline" } }}
              >
                Products
              </Box>
            </Button>
            {isAuthenticated && (
              <Button
                color="inherit"
                component={Link}
                to="/orders"
                startIcon={<Receipt />}
                sx={{
                  fontSize: { md: "0.875rem", lg: "1rem" },
                  fontWeight: isActive("/orders") ? 700 : 400,
                  backgroundColor: isActive("/orders")
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                  borderRadius: 2,
                  px: { md: 1, lg: 2 },
                  py: 1,
                  minWidth: { md: "auto", lg: "64px" },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{ display: { md: "none", lg: "inline" } }}
                >
                  Orders
                </Box>
              </Button>
            )}
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
                      fontSize: { md: "0.65rem", lg: "0.75rem" },
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
                fontSize: { md: "0.875rem", lg: "1rem" },
                fontWeight: isActive("/cart") ? 700 : 400,
                backgroundColor: isActive("/cart")
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                borderRadius: 2,
                px: { md: 1, lg: 2 },
                py: 1,
                minWidth: { md: "auto", lg: "64px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                component="span"
                sx={{ display: { md: "none", lg: "inline" } }}
              >
                Cart
              </Box>
            </Button>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  startIcon={<AccountCircle />}
                  onClick={handleMenuOpen}
                  sx={{
                    fontSize: { md: "0.875rem", lg: "1rem" },
                    borderRadius: 2,
                    px: { md: 1, lg: 2 },
                    py: 1,
                    minWidth: { md: "auto", lg: "auto" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: { md: "none", lg: "inline" },
                      maxWidth: { lg: "120px" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name || "Account"}
                  </Box>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      borderRadius: 2,
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem disabled>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "200px",
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  startIcon={<Login />}
                  sx={{
                    fontSize: { md: "0.875rem", lg: "1rem" },
                    borderRadius: 2,
                    px: { md: 1, lg: 2 },
                    py: 1,
                    minWidth: { md: "auto", lg: "64px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { md: "none", lg: "inline" } }}
                  >
                    Login
                  </Box>
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  startIcon={<PersonAdd />}
                  variant="outlined"
                  sx={{
                    fontSize: { md: "0.875rem", lg: "1rem" },
                    borderRadius: 2,
                    px: { md: 1, lg: 2 },
                    py: 1,
                    minWidth: { md: "auto", lg: "80px" },
                    borderColor: "rgba(255,255,255,0.5)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { md: "none", lg: "inline" } }}
                  >
                    Sign Up
                  </Box>
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Navigation */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0,
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              size={isMobile ? "small" : "medium"}
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
                    fontSize: "0.65rem",
                  },
                }}
              >
                <ShoppingCart fontSize={isMobile ? "small" : "medium"} />
              </Badge>
            </IconButton>
            {!isAuthenticated && (
              <IconButton
                color="inherit"
                onClick={() => navigate("/login")}
                size={isMobile ? "small" : "medium"}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <Login fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
            {isAuthenticated && (
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                size={isMobile ? "small" : "medium"}
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                <AccountCircle fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              size={isMobile ? "small" : "medium"}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "rotate(90deg)",
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <MenuIcon fontSize={isMobile ? "small" : "medium"} />
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
