import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

function Note({
  note,
  notes,
  id,
  setNotes,
  setCreateNote,
  setNote,
  setIsEdited,
}) {
  const { category, title, content, date } = note;
  const { user } = useUser();

  const deleteNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredNotes = notes.filter((note, index) => index !== id);
        setNotes(filteredNotes);
        localStorage.setItem(
          `${user?.id}_notes`,
          JSON.stringify(filteredNotes)
        );
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const editNote = (id) => {
    setCreateNote(true);
    setIsEdited(true);
    const editedNote = notes.find((note, index) => index === id);
    console.log(editedNote);
    setNote({ ...editedNote, id }); // Include id in the note state
  };
  const formattedTitle =
    title.length > 40 ? title.split("").slice(0, 40).join("") + "..." : title;
  const formattedContent =
    content.length > 150
      ? content.split("").slice(0, 150).join("") + "..."
      : content;

  return (
    <div
      className={`note bg-gradient-to-t ${
        category === "Business"
          ? "from-green to-light-blue"
          : category === "Home"
          ? "from-pink to-yellow"
          : category === "Personal"
          ? "from-violet to-light-violet"
          : ""
      }  px-4 py-2 rounded-md flex flex-col gap-5 hover:translate-`}
    >
      <div className="note__top flex justify-between">
        <div
          className="note__tag flex justify-center items-center p-2 bg-white/20
            rounded-full shadow-lg shadow-black/10 backdrop-blur-sm border
            border-white/30"
        >
          {category}
        </div>
        <div className="note__controls flex gap-2">
          <button
            onClick={() => editNote(id)}
            className="flex justify-center items-center w-5 h-5 p-5 bg-white/20
            rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm border
            border-white/30 hover:opacity-60 duration-700"
          >
            <i className="ri-edit-box-line text-2xl"></i>
          </button>
          <button
            onClick={() => deleteNote(id)}
            className="flex justify-center items-center w-5 h-5 p-5 bg-white/20 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm border
            border-white/30 hover:opacity-60 duration-700"
          >
            <i className="ri-delete-bin-line text-2xl"></i>
          </button>
        </div>
      </div>
      <div className="note__content flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{formattedTitle}</h1>
        <p className="min-h-24">{formattedContent}</p>
      </div>
      <p className="note__date flex justify-end mt-5">{date}</p>
    </div>
  );
}

export default Note;
