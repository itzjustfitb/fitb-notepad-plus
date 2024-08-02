import React, { useEffect, useState } from "react";
import Note from "../Note/Note";
import { useUser } from "@clerk/clerk-react";

function Notes({
  notes,
  setNotes,
  setCreateNote,
  setNote,
  setIsEdited,
  searchValue,
}) {
  const foundNotes = notes.filter((note) => note.title.includes(searchValue));

  return (
    <section>
      <div className="container sm:py-5 flex gap-4 min-h-72">
        {notes.length > 0 ? (
          searchValue === "" ? (
            <div className="w-full grid sm:grid-cols-3 h-fit gap-4">
              {notes.map((note, index) => (
                <Note
                  key={index}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  setCreateNote={setCreateNote}
                  setNote={setNote}
                  setIsEdited={setIsEdited}
                  id={index}
                />
              ))}
            </div>
          ) : foundNotes.length > 0 ? (
            <div className="w-full grid sm:grid-cols-3 h-fit gap-4">
              {foundNotes.map((note, index) => (
                <Note
                  key={index}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  setCreateNote={setCreateNote}
                  setNote={setNote}
                  setIsEdited={setIsEdited}
                  id={index}
                />
              ))}
            </div>
          ) : (
            <div className="w-full min-h-full flex flex-col gap-4 items-center justify-center">
              <i className="ri-error-warning-line text-5xl text-red-500"></i>
              <p className="text-lg dark:text-white">The note doesn't found!</p>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-0.5 -0.5 24 24"
              height="70"
              width="70"
              id="Note-Add-Fill--Streamline-Outlined-Fill---Material-Symbols"
            >
              <path
                className="fill-gray dark:fill-dark-1"
                d="M10.78125 17.39375H12.21875V14.303125000000001H15.333333333333334V12.865625000000001H12.21875V9.751041666666667H10.78125V12.865625000000001H7.666666666666667V14.303125000000001H10.78125V17.39375ZM5.270833333333334 21.083333333333336C4.8875 21.083333333333336 4.552083333333334 20.939583333333335 4.264583333333333 20.652083333333334C3.9770833333333337 20.364583333333336 3.8333333333333335 20.029166666666665 3.8333333333333335 19.645833333333336V3.354166666666667C3.8333333333333335 2.9708333333333337 3.9770833333333337 2.635416666666667 4.264583333333333 2.347916666666667C4.552083333333334 2.060416666666667 4.8875 1.9166666666666667 5.270833333333334 1.9166666666666667H13.919791666666667L19.166666666666668 7.163541666666666V19.645833333333336C19.166666666666668 20.029166666666665 19.022916666666667 20.364583333333336 18.73541666666667 20.652083333333334C18.447916666666668 20.939583333333335 18.1125 21.083333333333336 17.729166666666668 21.083333333333336H5.270833333333334ZM13.201041666666667 7.810416666666668H17.729166666666668L13.201041666666667 3.354166666666667V7.810416666666668Z"
                strokeWidth="1"
              ></path>
            </svg>
            <p className="dark:text-white">Write your first note!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Notes;
