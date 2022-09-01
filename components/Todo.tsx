import { useState } from "react";
import { TodoItem } from "../lib/todo";
import {
  HStack,
  Box,
  VStack,
  IconButton,
  Flex,
  Button,
  Text,
  StackDivider,
  Checkbox,
  SimpleGrid,
  Stack,
  Link,
  Spacer,
} from "@chakra-ui/react";

interface TodoProps {
  todo: TodoItem;
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, todoList, setTodoList }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const toggleCompleted = (completed: boolean) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex(
      (item) =>
        item.tagList === todo.tagList &&
        item.title === todo.title &&
        item.dueDate == todo.dueDate
    );
    newTodoList[index].completed = completed;

    console.debug(newTodoList);

    setTodoList(newTodoList);
  };

  return (
    <Box margin="1">
      <HStack
        justify="space-between"
        spacing={2}
        opacity={completed ? "0.4" : "1"}
      >
        <Checkbox
          colorScheme="green"
          checked={completed}
          onChange={(e) => {
            toggleCompleted(e.target.checked);
            setCompleted(e.target.checked);
          }}
        >
          {todo.title}
        </Checkbox>
        <Text>{todo.dueDate.toLocaleDateString()}</Text>
      </HStack>
      <SimpleGrid columns={5} spacing={2}>
        {todo.tagList.map((tag) => (
          <Button disabled size="xs" key={tag}>
            {tag}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Todo;
