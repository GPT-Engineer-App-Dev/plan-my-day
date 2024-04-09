import { useState } from "react";
import { Box, Heading, Input, Button, Checkbox, HStack, VStack, IconButton, Spacer, StackDivider } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Layout from "../components/Layout";

const TodoItem = ({ todo, onDelete, onToggle }) => (
  <HStack>
    <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo.id)} />
    <Box>{todo.text}</Box>
    <Spacer />
    <IconButton icon={<FaTrash />} onClick={() => onDelete(todo.id)} />
  </HStack>
);

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <Layout>
      <Heading mb={4}>My Todos</Heading>
      <HStack mb={4}>
        <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" />
        <Button onClick={handleAddTodo} leftIcon={<FaPlus />}>
          Add Todo
        </Button>
      </HStack>
      <VStack divider={<StackDivider />} alignItems="stretch">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} onToggle={handleToggleTodo} />
        ))}
      </VStack>
    </Layout>
  );
};

export default Index;
