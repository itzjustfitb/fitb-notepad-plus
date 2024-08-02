import { useEffect, useState } from "react";
import AddNote from "./components/AddNote/AddNote";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Note from "./components/Note/Note";
import Notes from "./components/Notes/Notes";
import PageHeader from "./components/PageHeader/PageHeader";
import Loader from "./components/Loader/Loader";
import { useUser } from "@clerk/clerk-react";

function App() {
  const [createNote, setCreateNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

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
      <Header />
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
      <Footer />
    </main>
  );
}

export default App;
