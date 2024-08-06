import { useUser } from "@clerk/clerk-react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

function AddNote({
  setCreateNote,
  notes,
  setNotes,
  note,
  setNote,
  isEdited,
  setIsEdited,
}) {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${month}.${day}.${year} ${hours}:${minutes}`;
  const { user } = useUser();

  useEffect(() => {
    localStorage.setItem(`${user?.id}_notes`, JSON.stringify(notes));
  }, [notes]);

  const addingNewNote = () => {
    const newNote = { ...note, date: formattedDate };
    if ((note.category !== "") & (note.content !== "") & (note.title !== "")) {
      setNotes((prevNotes) => {
        let updatedNotes;
        if (isEdited) {
          updatedNotes = prevNotes.map((n, index) =>
            index === note.id ? newNote : n
          );
          Swal.fire({
            title: "Edited!",
            text: "Your note edited succesfully!",
            icon: "success",
          });
        } else {
          updatedNotes = [...prevNotes, newNote];
        }

        localStorage.setItem(`${user?.id}_notes`, JSON.stringify(updatedNotes));
        return updatedNotes;
      });
      setIsEdited(false);
      setCreateNote(false);
      setNote({
        title: "",
        content: "",
        category: "",
        date: "",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Fill the inputs!",
      });
    }
  };

  return (
    <div
      onClick={() => {
        setIsEdited(false);
        setCreateNote(false);
        setNote({
          title: "",
          content: "",
          category: "",
          date: "",
        });
      }}
      className="add-note fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="add__note-container container bg-white dark:bg-dark rounded-lg w-3/4 p-9 flex flex-col items-end gap-4"
      >
        <div className="flex items-center justify-between w-full">
          <p className="text-lg sm:text-3xl sm:font-bold dark:text-gray">
            Write a note
          </p>
          <Button
            onClick={() => {
              setIsEdited(false);
              setCreateNote(false);
              setNote({
                title: "",
                content: "",
                category: "",
                date: "",
              });
            }}
            className="sm:w-fit bg-transparent p-0 min-w-0 shadow-none"
            variant="contained"
          >
            <i className="ri-close-large-line flex justify-end text-xl sm:text-3xl text-black dark:text-gray"></i>
          </Button>
        </div>
        <div className="add__note-top w-full grid sm:grid-cols-2 gap-4">
          <TextField
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            InputProps={{
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    localStorage.theme === "light" ? "black" : "#313131",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    localStorage.theme === "light"
                      ? "black !important"
                      : "gray !important", // Border color when focused
                },
                "&:hover fieldset": {
                  borderColor:
                    localStorage.theme === "light"
                      ? "black !important"
                      : "gray !important", // Border color on hover
                },
                "& .MuiInputBase-input": {
                  color: localStorage.theme === "light" ? "black" : "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red",
                  },
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: localStorage.theme === "light" ? "black" : "gray",
                "&.Mui-focused": {
                  color: localStorage.theme === "light" ? "black" : "gray",
                },
              },
            }}
          />
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                color: localStorage.theme === "light" ? "black" : "gray",
                "&.Mui-focused": {
                  color: localStorage.theme === "light" ? "black" : "gray",
                },
              }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={note.category}
              label="Category"
              onChange={(e) => setNote({ ...note, category: e.target.value })}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    localStorage.theme === "light" ? "black" : "#313131",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    localStorage.theme === "light"
                      ? "black !important"
                      : "gray !important", // Border color when focused
                },
                "&:hover fieldset": {
                  borderColor:
                    localStorage.theme === "light"
                      ? "black !important"
                      : "gray !important", // Border color on hover
                },
                "& .MuiInputBase-input": {
                  color: localStorage.theme === "light" ? "black" : "gray",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red",
                  },
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor:
                      localStorage.theme === "light" ? "" : "#1f1f1f",
                    color: localStorage.theme === "light" ? "black" : "gray",
                  },
                },
              }}
            >
              <MenuItem value={"Business"}>Business</MenuItem>
              <MenuItem value={"Personal"}>Personal</MenuItem>
              <MenuItem value={"Home"}>Home</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full"
          id="outlined-multiline-flexible"
          label="Note"
          multiline
          minRows={6}
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  localStorage.theme === "light" ? "black" : "#313131",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  localStorage.theme === "light"
                    ? "black !important"
                    : "gray !important", // Border color when focused
              },
              "&:hover fieldset": {
                borderColor:
                  localStorage.theme === "light"
                    ? "black !important"
                    : "gray !important", // Border color on hover
              },
              "& .MuiInputBase-input": {
                color: localStorage.theme === "light" ? "black" : "gray",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "red",
                },
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: localStorage.theme === "light" ? "black" : "gray",
              "&.Mui-focused": {
                color: localStorage.theme === "light" ? "black" : "gray",
              },
            },
          }}
        />
        {isEdited ? (
          <Button
            onClick={addingNewNote}
            className="w-fit bg-green p-3 text-lg"
            variant="contained"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={addingNewNote}
            className="w-fit bg-black p-3 text-lg"
            variant="contained"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}

export default AddNote;
