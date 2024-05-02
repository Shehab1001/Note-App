import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import useNotes from "../../hooks/use-notes";
import { Fragment, useEffect, useState } from "react";
import UpdateNoteModal from "../UpdateNoteModal/UpdateNoteModal";

const Note = ({ title, content, _id }) => {
  const { deleteNoteWithSweetAlert } = useNotes();

  const [updateNoteTitle, setUpdateNoteTitle] = useState("");
  const [updateNoteContent, setUpdateNoteContent] = useState("");

  useEffect(() => {
    setUpdateNoteTitle(title);
    setUpdateNoteContent(content);
  }, []);

  return (
    <Fragment>
      <div className="col-md-4">
        <div className="bg-white shadow text-center py-4 my-3 rounded">
          <p>{title}</p>
          <p>{content}</p>
          <div className="d-flex justify-content-center align-items-center">
            <AiOutlineEdit
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target={`#updateNoteModal-${_id}`}
            />
            <BsFillTrash3Fill
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => deleteNoteWithSweetAlert(_id)}
            />
          </div>
        </div>
      </div>
      <UpdateNoteModal
        updateNoteTitle={updateNoteTitle}
        updateNoteContent={updateNoteContent}
        setUpdateNoteTitle={setUpdateNoteTitle}
        setUpdateNoteContent={setUpdateNoteContent}
        title={title}
        content={content}
        id={_id}
      />
    </Fragment>
  );
};

export default Note;
