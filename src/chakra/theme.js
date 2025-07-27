// src/chakra/theme.js
import { extendTheme } from "@chakra-ui/react"; // 👈 Change this line!

// This is the simplest way to get the default Chakra UI theme.
const theme = extendTheme({});

// You can customize it here if you want:
/*
const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  // ... other customizations
});
*/

export default theme;
