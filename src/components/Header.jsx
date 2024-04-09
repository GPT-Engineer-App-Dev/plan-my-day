import { Box, Heading } from "@chakra-ui/react";

const Header = () => (
  <Box bg="blue.500" py={4}>
    <Heading as="h1" size="xl" textAlign="center" color="white">
      My Todo List
    </Heading>
  </Box>
);

export default Header;
