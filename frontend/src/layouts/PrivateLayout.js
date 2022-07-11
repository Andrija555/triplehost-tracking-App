import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "components/organisms/Header";
import Footer from "components/organisms/Footer";

const PrivateLayout = ({ children }) => (
  <Container component="main" maxWidth="xl" sx={{px:0}} >
    <Header />
    <Box sx={{ overflow: "auto"}} mt={window.location.pathname==="/map" ? 10 : 13} mb={9}>
      {children}
    </Box>
    <Footer />
  </Container>
);

export default PrivateLayout;
