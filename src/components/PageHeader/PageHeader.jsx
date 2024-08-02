import { useUser } from "@clerk/clerk-react";
import React from "react";
import Swal from "sweetalert2";

function PageHeader({ setCreateNote, searchValue, setSearchValue }) {
  const { user } = useUser();

  return (
    <section className="py-5 container flex flex-col sm:flex-row gap-3 sm:gap-5 ">
      <div className="flex flex-auto relative">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="dark:bg-dark dark:focus:outline-none dark:focus:border-white/20 dark:border-dark-1 dark:text-white flex flex-auto rounded-md pl-12 py-3 border border-solid "
          placeholder="Search your note here..."
        />
        <i className="ri-search-line absolute top-1/2 transform -translate-y-1/2 left-3 text-2xl dark:text-white"></i>
      </div>
      <button
        onClick={() => {
          if (user) {
            setCreateNote(true);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please sign in first!",
            });
          }
        }}
        className="w-full sm:w-48 flex justify-center items-center dark:bg-dark-2 bg-black text-white p-3 rounded-md duration-300 text-xl gap-2 hover:opacity-70"
      >
        <i className="ri-add-line"></i>
        Add note
      </button>
    </section>
  );
}

export default PageHeader;
