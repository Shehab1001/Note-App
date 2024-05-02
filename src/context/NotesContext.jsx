import { createContext, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [addNoteTitle, setAddNoteTitle] = useState("");
  const [addNoteContent, setAddNoteContent] = useState("");
  const [noNotesError, setNoNotesError] = useState(null);

  const getUserNotes = async () => {
    try {
      const { data } = await axios.get("/notes", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      if (data.msg === "done") {
        setNotes(data.notes);
        setNoNotesError(null);
      }
    } catch (error) {
      if (error.response?.data.statusCode === 404) {
        setNoNotesError(error.response.data.msg);
      }

      toast.error(error.response?.data?.msg, {
        duration: 3000,
        className: " text-danger px-5 fw-bolder my-3",
      });
    }
  };

  const workSavedSweetAlert = () => {
    Swal.fire({
      title: "Your Work has been Saved",
      timer: 2000,
      icon: "success",
      showCloseButton: false,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };

  const addNote = async () => {
    if (addNoteTitle && addNoteContent) {
      try {
        const { data } = await axios.post(
          "/notes",
          {
            title: addNoteTitle,
            content: addNoteContent,
          },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );

        getUserNotes();

        setAddNoteTitle("");
        setAddNoteContent("");

        workSavedSweetAlert();
      } catch (error) {
        toast.error(error.response?.data?.msg, {
          duration: 3000,
          className: " text-danger px-5 fw-bolder my-3",
        });
      }
    } else {
      toast.error("Please fill in both title and content are required", {
        duration: 3000,
        className: " text-danger px-5 fw-bolder my-3",
      });
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(`/notes/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      getUserNotes();
    } catch (error) {
      toast.error(error.response?.data?.msg, {
        duration: 3000,
        className: " text-danger px-5 fw-bolder my-3",
      });
    }
  };

  const updateNote = async (id, title, content) => {
    if (title && content) {
      try {
        const { data } = await axios.put(
          `/notes/${id}`,
          {
            title,
            content,
          },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );

        getUserNotes();

        workSavedSweetAlert();
      } catch (error) {
        toast.error(error.response?.data?.msg, {
          duration: 3000,
          className: " text-danger px-5 fw-bolder my-3",
        });
      }
    } else {
      toast.error("Please fill in both title and content are required", {
        duration: 3000,
        className: " text-danger px-5 fw-bolder my-3",
      });
    }
  };

  const deleteNoteWithSweetAlert = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-3",
        cancelButton: "btn btn-danger me-3",
        denyButton: "d-none",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        showDenyButton: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteNote(id);

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <NotesContext.Provider
      value={{
        addNoteTitle,
        setAddNoteTitle,
        addNoteContent,
        setAddNoteContent,
        getUserNotes,
        noNotesError,
        addNote,
        notes,
        deleteNote,
        updateNote,
        deleteNoteWithSweetAlert,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
