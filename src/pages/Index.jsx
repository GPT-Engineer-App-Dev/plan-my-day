import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Text, Checkbox, IconButton, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Header = () => (
  <Box bg="blue.500" py={4}>
    <Heading as="h1" size="xl" textAlign="center" color="white">
      My Todo List
    </Heading>
  </Box>
);

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <HStack spacing={3}>
    <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo.id)} />
    <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
    <IconButton icon={<FaTrash />} size="sm" onClick={() => onDelete(todo.id)} aria-label="Delete todo" />
  </HStack>
);

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const toast = useToast();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    } else {
      toast({
        title: "Error",
        description: "Todo text cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box>
      <Header />
      <Box maxWidth="600px" mx="auto" mt={8} p={4}>
        <Flex mb={4}>
          <Input value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter a new todo" mr={4} />
          <Button onClick={handleAddTodo} colorScheme="blue" leftIcon={<FaPlus />}>
            Add
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Index;
