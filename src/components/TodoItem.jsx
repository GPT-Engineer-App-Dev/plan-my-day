import { HStack, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <HStack spacing={4}>
    <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo.id)} />
    <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
    <IconButton icon={<FaTrash />} size="sm" onClick={() => onDelete(todo.id)} aria-label="Delete todo" />
  </HStack>
);

export default TodoItem;
