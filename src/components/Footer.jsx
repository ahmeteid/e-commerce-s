import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { Fade } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        mt: "auto",
        pt: { xs: 4, sm: 5, md: 6 },
        pb: { xs: 2, sm: 3 },
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            {/* Company Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                🛍️ E-Commerce Store
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  opacity: 0.9,
                  lineHeight: 1.8,
                  fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                }}
              >
                Your trusted online shopping destination. We offer quality
                products at great prices with excellent customer service.
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Facebook"
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Twitter"
                >
                  <Twitter fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="Instagram"
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  aria-label="LinkedIn"
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  to="/"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  className="footer-link"
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(4px)",
                        opacity: 0.8,
                      },
                    }}
                  >
                    Home
                  </Typography>
                </Link>
                <Link
                  to="/products"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  className="footer-link"
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(4px)",
                        opacity: 0.8,
                      },
                    }}
                  >
                    Products
                  </Typography>
                </Link>
                <Link
                  to="/cart"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  className="footer-link"
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(4px)",
                        opacity: 0.8,
                      },
                    }}
                  >
                    Shopping Cart
                  </Typography>
                </Link>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  About Us
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  Contact
                </Box>
              </Box>
            </Grid>

            {/* Customer Service */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Customer Service
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  FAQ
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  Shipping Info
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  Returns
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  Privacy Policy
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "inherit",
                    cursor: "pointer",
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      opacity: 0.8,
                    },
                  }}
                >
                  Terms of Service
                </Box>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      opacity: 0.9,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      opacity: 0.9,
                    }}
                  >
                    support@ecommerce.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      opacity: 0.9,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      opacity: 0.9,
                    }}
                  >
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <LocationOn
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      opacity: 0.9,
                      mt: 0.5,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    123 Shopping Street,
                    <br />
                    City, State 12345
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Fade>

        <Divider
          sx={{
            my: { xs: 3, sm: 4 },
            borderColor: "rgba(255,255,255,0.2)",
          }}
        />

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            pt: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            © {currentYear} E-Commerce Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

