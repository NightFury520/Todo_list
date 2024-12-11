import React, { useEffect, useState } from "react";
import { Button, Box, TextField, Snackbar, Alert } from "@mui/material";
import { MiddleSectionWrapper, ToDoBody } from "../components/StyledComponent/home";
import dayjs, { Dayjs } from "dayjs";
import { FaPlus } from "react-icons/fa";
import { Task } from "../type/type";
import CreateModal from "../components/Modal/CreateModal";
import CardTabs from "../components/CardTabs/CardTabs";
import {
  createTodoList,
  deleteTodoList,
  getTodoList,
  updateTodoList,
} from "../redux/TodoList/todoActions";
import { useAppDispatch, useAppSelector } from "../redux/hook/hooks";

const ToDo: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos); // Access nested todos list
  const [value, setValue] = useState<Task>({
    title: "",
    description: "",
    duedate: "",
    completed: false,
    important: false,
    userUuid: JSON.parse(sessionStorage.getItem("userId") || '""'),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string>("");
  const [selected, setSelected] = useState<Dayjs | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setValue({
      title: "",
      description: "",
      duedate: "",
      completed: false,
      important: false,
      userUuid: JSON.parse(sessionStorage.getItem("userId") || '""'),
    });
    setSelected(null);
    setIsEditing(false);
    setEditingTaskId("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value: inputValue, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : inputValue;
    setValue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const onChangedate = (duedate: Dayjs | null) => {
    setSelected(duedate);
    setValue((prev) => ({
      ...prev,
      duedate: duedate ? duedate.format("YYYY-MM-DD") : "",
    }));
  };

  const handleEdit = (uuid: string) => {
    const taskToEdit = todos.find((task:Task) => task.uuid === uuid);
    if (taskToEdit) {
      setValue({
        ...taskToEdit,
        duedate: taskToEdit.duedate ? dayjs(taskToEdit.duedate) : "",
      });
      setSelected(taskToEdit.duedate ? dayjs(taskToEdit.duedate) : null);
      setEditingTaskId(uuid);
      setIsEditing(true);
      handleOpen();
    }
  };

  const handleSubmit = async () => {
    try {
      if (!value.title.trim() || !value.description.trim() || !value.duedate) {
        alert("All fields are required.");
        return;
      }

      if (isEditing) {
        await dispatch(updateTodoList(editingTaskId, value));
        setSnackbarMessage("Task updated successfully!");
      } else {
        await dispatch(createTodoList(value));
        setSnackbarMessage("Task created successfully!");
      }

      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(getTodoList());
      handleClose();
    } catch (error) {
      console.error("Error in handleSubmit", error);
      setSnackbarMessage("An error occurred.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (uuid: string) => {
    try {
      await dispatch(deleteTodoList(uuid));
      dispatch(getTodoList());
      setSnackbarMessage("Task deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error in handleDelete", error);
      setSnackbarMessage("Failed to delete task.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleToggleComplete = async (uuid: string, completed: boolean) => {
    try {
      await dispatch(updateTodoList(uuid, { completed }));
      dispatch(getTodoList());
    } catch (error) {
      console.error("Error in handleToggleComplete", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = Array.isArray(todos)
    ? todos.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <ToDoBody>
        <MiddleSectionWrapper>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="success"
            style={{
              backgroundColor: "var(--tab-bar-color)",
              color: "white",
              fontWeight: "bold",
              height: "56px",
            }}
          >
            <FaPlus style={{ color: "white" }} />
            &nbsp;New Task
          </Button>
          <Box
            sx={{
              width: 450,
              maxWidth: "100%",
              "@media(max-width: 624px)": { width: "100%" },
              marginTop: "10px",
            }}
          >
            <TextField
              fullWidth
              label="Search Here!"
              id="search"
              onChange={handleSearch}
              sx={{
                backgroundColor: "transparent",
                borderRadius: "8px",
                input: {
                  color: "var(--text-color)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--text-color)",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--text-color)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--text-color)",
                  },
                },
              }}
            />
          </Box>
        </MiddleSectionWrapper>
        <CardTabs
          todos={filteredTodos}
          handleEdit={handleEdit}
          handleRemove={handleDelete}
          handleCompleted={handleToggleComplete}
        />
      </ToDoBody>
      <CreateModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        value={value}
        onChangedate={onChangedate}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        selected={selected}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ToDo;
