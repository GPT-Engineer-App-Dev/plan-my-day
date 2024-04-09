import React, { useState } from "react";
import { Box, Heading, Input, Button, Flex, Checkbox, IconButton, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth="500px" margin="auto" p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        My Todo List
      </Heading>
      <Flex mb={8}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={4} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Flex>
      <List spacing={4}>
        {todos.map((todo, index) => (
          <ListItem key={index} p={4} borderWidth={1} borderRadius="md" backgroundColor={todo.completed ? "gray.100" : "white"}>
            <Flex alignItems="center">
              <Checkbox isChecked={todo.completed} onChange={() => handleToggleComplete(index)} mr={4} />
              <Text textDecoration={todo.completed ? "line-through" : "none"} flexGrow={1}>
                {todo.text}
              </Text>
              <Spacer />
              <IconButton icon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteTodo(index)} />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
