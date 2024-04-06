import React, { useState } from "react";
import { Box, Heading, Input, VStack, IconButton, Text, HStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No task entered",
        description: "Please enter a task before adding.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Heading mb={6}>Todo App</Heading>
        <HStack>
          <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add your new todo" variant="filled" />
          <IconButton icon={<FaPlus />} onClick={addTask} colorScheme="blue" aria-label="Add todo" />
        </HStack>
        <VStack spacing={2} align="stretch">
          {tasks.map((task) => (
            <HStack key={task.id}>
              <Text p={2} flex="1">
                {task.text}
              </Text>
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" aria-label="Delete todo" />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;
