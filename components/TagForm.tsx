import { Button, HStack, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { TodoItem } from "../lib/todo";

interface CreateTagForm {
  createTag: (tag: string) => void;
}

const CreateTagForm: React.FC<CreateTagForm> = ({ createTag }) => {
  // Feature 1: Todo Form
  // Form should have input fields for title (a short description of todo item), tags (array of words describing todo item), and a due
  // The user can create a tag via a text input field and "create tag" button
  // The user can view all created tags in the todo form in a list view
  // The user can toggle each tag to delete them
  // The user can create a new todo item appear on the todo list section (feature 2)
  // The user cannot create a todo item when title and due dates aren't specified
  // The form should be cleared out after creating a new todo item (title text input field, tag list, tag input field, due date input field should be cleared after creating a new todo item)

  const [newTag, setNewTag] = useState("");

  return (
    <HStack>
      <Input
        type="text"
        value={newTag}
        placeholder="New Tag"
        onChange={(e) => setNewTag(e.target.value)}
      />
      <Button
        type="button"
        onClick={() => {
          if (newTag && newTag != "") {
            createTag(newTag);
            setNewTag("");
          }
        }}
      >
        Create
      </Button>
    </HStack>
  );
};

export default CreateTagForm;
