import { TodoItem } from "../lib/todo";
import Todo from "../components/Todo";
import { useState } from "react";
import {
  Checkbox,
  HStack,
  Input,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";

interface TodoListProps {
  todoList: TodoItem[];
  setTodoList: (todoList: TodoItem[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, setTodoList }) => {
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByCompletion, setSortByCompletion] = useState(false);

  const listCopy = [...todoList];

  listCopy
    .sort((a, b) => {
      if (sortByCompletion && a.completed !== b.completed) {
        return Number(b.completed) - Number(a.completed);
      }
      if (sortByDate) {
        return b.dueDate.getTime() - a.dueDate.getTime();
      }
      return 0;
    })
    .reverse();

  return (
    <VStack>
      <HStack>
        <Checkbox
          colorScheme="green"
          checked={sortByDate}
          onChange={(e) => setSortByDate(e.target.checked)}
        >
          Sort by date
        </Checkbox>

        <Checkbox
          colorScheme="green"
          checked={sortByCompletion}
          onChange={(e) => {
            setSortByCompletion(e.target.checked);
          }}
        >
          Sort by completion
        </Checkbox>
      </HStack>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {listCopy.map((todo) => (
          <Todo
            key={todo.title + todo.dueDate + todo.tagList.join("")}
            todo={todo}
            todoList={todoList}
            setTodoList={setTodoList}
          />
        ))}
      </VStack>
    </VStack>
  );
};

export default TodoList;
