import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Checkbox, IconButton, VStack, HStack, Spacer, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Header = () => (
  <Box bg="blue.500" py={4} px={8}>
    <Heading as="h1" size="xl" color="white">
      My Todo List
    </Heading>
  </Box>
);

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <VStack align="stretch" mt={8}>
    {todos.map((todo, index) => (
      <HStack key={index}>
        <Checkbox isChecked={todo.completed} onChange={() => toggleTodo(index)} />
        <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
        <Spacer />
        <IconButton icon={<FaTrash />} onClick={() => deleteTodo(index)} size="sm" variant="ghost" colorScheme="red" />
      </HStack>
    ))}
  </VStack>
);

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Box>
      <Header />
      <Box p={8}>
        <Flex>
          <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" mr={4} />
          <Button leftIcon={<FaPlus />} onClick={addTodo} colorScheme="blue">
            Add Todo
          </Button>
        </Flex>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </Box>
    </Box>
  );
};

export default Index;
