import useNotes from "../../hooks/use-notes";

const UpdateNoteModal = ({
  updateNoteTitle,
  setUpdateNoteTitle,
  updateNoteContent,
  setUpdateNoteContent,
  id,
  title,
  content,
}) => {
  const { updateNote } = useNotes();

  const handleCloseModal = () => {
    setUpdateNoteTitle(title);
    setUpdateNoteContent(content);
  };

  return (
    <div
      className="modal fade"
      id={`updateNoteModal-${id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby={`updateNoteModalLabel-${id}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`updateNoteModalLabel-${id}`}>
              Update Note
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="Title"
              onChange={(e) => setUpdateNoteTitle(e.target.value)}
              value={updateNoteTitle}
            />
            <input
              className="form-control"
              type="text"
              name=""
              id=""
              placeholder="Content"
              onChange={(e) => setUpdateNoteContent(e.target.value)}
              value={updateNoteContent}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss={updateNoteTitle && updateNoteContent && "modal"}
              onClick={() => updateNote(id, updateNoteTitle, updateNoteContent)}
            >
              Update Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNoteModal;
