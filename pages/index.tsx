import {
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { TodoItem } from "../lib/todo";

const Home: NextPage = () => {
  // Feature 1: Todo Form
  // Form should have input fields for title (a short description of todo item), tags (array of words describing todo item), and a due
  // The user can create a tag via a text input field and "create tag" button
  // The user can view all created tags in the todo form in a list view
  // The user can toggle each tag to delete them
  // The user can create a new todo item appear on the todo list section (feature 2)
  // The user cannot create a todo item when title and due dates aren't specified
  // The form should be cleared out after creating a new todo item (title text input field, tag list, tag input field, due date input field should be cleared after creating a new todo item)

  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  return (
    <VStack spacing="10" marginTop="10">
      <Heading>Jay&apos;s TODO List </Heading>
      <TodoForm todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </VStack>
  );
};

export default Home;
