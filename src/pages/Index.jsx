import React, { useState, useEffect } from "react";
import { Box, Input, Button, Flex, useToast, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import Layout from "../components/Layout";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";

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
      <Layout>
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
      </Layout>
    </Box>
  );
};

export default Index;
