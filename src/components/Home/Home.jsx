import React from "react";
import PageHeader from "../PageHeader/PageHeader";
import Notes from "../Notes/Notes";
import AddNote from "../AddNote/AddNote";

function Home({
  setSearchValue,
  setCreateNote,
  searchValue,
  notes,
  setNotes,
  note,
  setNote,
  setIsEdited,
  createNote,
  isEdited,
}) {
  return (
    <main>
      <PageHeader
        setSearchValue={setSearchValue}
        setCreateNote={setCreateNote}
        searchValue={searchValue}
      />
      <Notes
        notes={notes}
        setNotes={setNotes}
        setCreateNote={setCreateNote}
        note={note}
        setNote={setNote}
        setIsEdited={setIsEdited}
        searchValue={searchValue}
      />
      {createNote ? (
        <AddNote
          note={note}
          setNote={setNote}
          notes={notes}
          setNotes={setNotes}
          setCreateNote={setCreateNote}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        />
      ) : (
        ""
      )}
    </main>
  );
}

export default Home;
