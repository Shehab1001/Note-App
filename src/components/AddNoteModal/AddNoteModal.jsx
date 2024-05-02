import useNotes from "../../hooks/use-notes";

const AddNoteModal = () => {
  const {
    addNoteTitle,
    setAddNoteTitle,
    addNoteContent,
    setAddNoteContent,
    addNote,
  } = useNotes();

  return (
    <div
      className="modal fade"
      id="addNoteModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="addNoteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addNoteModalLabel">
              Add Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="Title"
              onChange={(e) => setAddNoteTitle(e.target.value)}
              value={addNoteTitle}
            />
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="Content"
              onChange={(e) => setAddNoteContent(e.target.value)}
              value={addNoteContent}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss={addNoteTitle && addNoteContent && "modal"}
              onClick={addNote}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
