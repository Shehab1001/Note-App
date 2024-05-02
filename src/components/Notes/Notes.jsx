import { Fragment, useEffect } from "react";
import Note from "../Note/Note";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import useNotes from "../../hooks/use-notes";

const Notes = () => {
  const { getUserNotes, noNotesError, notes } = useNotes();

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div
          className="border-bottom border-dark position-relative mb-4"
          style={{ padding: "80px 10px 10px" }}
        >
          <h3>My Notes</h3>
          <button
            className="btn btn-primary position-absolute end-0"
            style={{ top: "25%" }}
            data-bs-toggle="modal"
            data-bs-target="#addNoteModal"
          >
            + Add Note
          </button>
        </div>

        <div className="container">
          <div className="row g-3">
            {noNotesError ? (
              <p className="text-center text-dark fw-bold text-capitalize fs-4">
                {noNotesError}
              </p>
            ) : (
              notes.map((note) => {
                return <Note key={note._id} {...note} />;
              })
            )}
          </div>
        </div>
      </div>
      <AddNoteModal />
    </Fragment>
  );
};

export default Notes;
