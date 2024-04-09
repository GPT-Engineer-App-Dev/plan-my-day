import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => (
  <Box maxWidth="xl" mx="auto" p={4}>
    {children}
  </Box>
);

export default Layout;
