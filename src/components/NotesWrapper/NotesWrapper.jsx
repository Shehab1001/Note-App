import Notes from "../Notes/Notes";
import NotesSidebar from "../NotesSidebar/NotesSidebar";

const NotesWrapper = () => {
  return (
    <div className="d-flex">
      <NotesSidebar />
      <Notes />
    </div>
  );
};

export default NotesWrapper;
