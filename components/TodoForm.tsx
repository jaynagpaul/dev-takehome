import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  HStack,
  Input,
  ListItem,
  SimpleGrid,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { TodoItem } from "../lib/todo";
import CreateTagForm from "./TagForm";

interface TodoFormProps {
  todoList: TodoItem[];
  setTodoList: (list: TodoItem[]) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todoList, setTodoList }) => {
  // Feature 1: Todo Form
  // Form should have input fields for title (a short description of todo item), tags (array of words describing todo item), and a due
  // The user can create a tag via a text input field and "create tag" button
  // The user can view all created tags in the todo form in a list view
  // The user can toggle each tag to delete them
  // The user can create a new todo item appear on the todo list section (feature 2)
  // The user cannot create a todo item when title and due dates aren't specified
  // The form should be cleared out after creating a new todo item (title text input field, tag list, tag input field, due date input field should be cleared after creating a new todo item)

  const [tagList, setTagList] = useState<string[]>([]);

  const createTodo = (todo: TodoItem) => {
    setTodoList([...todoList, todo]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
      dueDate: { value: string };
    };

    const title = target.title.value;

    // Normalize timestamps
    let dueDate = new Date(target.dueDate.value);
    dueDate = new Date(
      dueDate.getTime() + Math.abs(dueDate.getTimezoneOffset() * 60000)
    );

    const todo: TodoItem = { title, tagList, dueDate, completed: false };

    createTodo(todo);

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Box borderWidth="1px" borderRadius="md">
          <VStack margin="5">
            <Input isRequired type="text" placeholder="Title" name="title" />

            <CreateTagForm createTag={(tag) => setTagList([...tagList, tag])} />

            <Box p="3">
              <SimpleGrid columns={5} spacing={"5"}>
                {tagList.map((tag) => (
                  <Button
                    size="sm"
                    key={tag}
                    onClick={() => {
                      setTagList(tagList.filter((t) => t !== tag));
                    }}
                  >
                    <CloseIcon marginRight="1" />
                    {tag}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>

            <Input
              isRequired
              type="date"
              placeholder="Due Date"
              name="dueDate"
            />

            <Button type="submit">Create Todo</Button>
          </VStack>
        </Box>
      </FormControl>
    </form>
  );
};

export default TodoForm;
