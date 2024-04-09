import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Flex, Checkbox, IconButton, VStack, HStack, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Header = () => (
  <Box bg="blue.500" py={4}>
    <Heading as="h1" size="xl" textAlign="center" color="white">
      My Todo List
    </Heading>
  </Box>
);

const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (text.trim() !== "") {
      onAddTodo(text);
      setText("");
    } else {
      toast({
        title: "Please enter a todo",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex mt={8}>
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter a new todo" mr={4} />
      <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </Flex>
  );
};

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <HStack spacing={4} mb={2}>
    <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo.id)} />
    <Box textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Box>
    <Spacer />
    <IconButton icon={<FaTrash />} colorScheme="red" size="sm" onClick={() => onDelete(todo.id)} />
  </HStack>
);

const TodoList = ({ todos, onToggle, onDelete }) => (
  <VStack align="stretch" mt={8}>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
    ))}
  </VStack>
);

const Index = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
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
    <Box maxWidth="600px" mx="auto" p={4}>
      <Header />
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </Box>
  );
};

export default Index;
