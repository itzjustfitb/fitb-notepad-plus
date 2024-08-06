import { useEffect, useState } from "react";
import AddNote from "./components/AddNote/AddNote";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Note from "./components/Note/Note";
import Notes from "./components/Notes/Notes";
import PageHeader from "./components/PageHeader/PageHeader";
import Loader from "./components/Loader/Loader";
import { useUser } from "@clerk/clerk-react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

function App() {
  const [createNote, setCreateNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const location = useLocation();
  useEffect(() => {
    setIsLoading(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "initial";
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const storedNotes =
      JSON.parse(localStorage.getItem(`${user?.id}_notes`)) || [];
    setNotes(storedNotes);
  }, [user]);

  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
    date: "",
  });

  return (
    <main className="flex flex-col font-poppins dark:bg-dark">
      {isLoading ? <Loader /> : ""}
      {location.pathname !== "/sign-in" ? <Header /> : ""}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSearchValue={setSearchValue}
              setCreateNote={setCreateNote}
              searchValue={searchValue}
              notes={notes}
              setNotes={setNotes}
              note={note}
              setNote={setNote}
              setIsEdited={setIsEdited}
              isEdited={isEdited}
              createNote={createNote}
            />
          }
        />
        <Route path="/sign-in" element={<Auth />} />
      </Routes>
      {location.pathname !== "/sign-in" ? <Footer /> : ""}
    </main>
  );
}

export default App;
