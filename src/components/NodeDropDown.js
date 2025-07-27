import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Select as ChakraReactSelect } from "chakra-react-select"; // Import with alias

const availableNodeTypes = [
  { value: "circle", label: "Circle Node", color: "#6ab04c" },
  { value: "square", label: "Square Node", color: "#f39c12" },
  { value: "triangle", label: "Triangle Node", color: "#e74c3c" },
  // Add more as needed
];

export const DropDown = ({ onNodeSelect }) => {
  // onNodeSelect will now receive an array of selected node objects

  const handleChange = (selectedOptions) => {
    // selectedOptions will be an array of { value, label, color } objects
    if (selectedOptions && selectedOptions.length > 0) {
      onNodeSelect(selectedOptions);
    }
  };

  return (
    <Box
      id="demo-content"
      style={{
        maxHeight: "100vh",
        minWidth: "300px",
        height: "min-content",
        backgroundColor: "white",
        borderRadius: "10px",
        width: "min-content",
        position: "absolute",
        top: "70px",
        right: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000, // Ensure it's above the flow
      }}
    >
      <Heading as="h4" size="md" mb={4}>
        Add Nodes
      </Heading>
      <ChakraReactSelect
        isMulti // This is the key prop for multi-select
        name="nodes"
        options={availableNodeTypes}
        placeholder="Select nodes..."
        closeMenuOnSelect={false} // Keep menu open after selection
        onChange={handleChange}
        selectedOptionStyle="check" // Or "color" for different styling
        // You might want to control the value if you have default selected nodes
        // value={[]} // Example: empty array for controlled component
      />
    </Box>
  );
};
