import notesImage from "../../assets/images/notes.png";
import { BsPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import useAuth from "../../hooks/use-auth";
import { Link } from "react-router-dom";

const NotesSidebar = () => {
  const { handleLogout } = useAuth();

  return (
    <div
      className="bg-dark text-white position-sticky top-0"
      style={{ height: "100vh", width: "25%" }}
    >
      <div className="d-flex justify-content-center align-items-center mt-5">
        <p className="me-3 mb-0 d-none d-md-block">Notes</p>
        <div style={{ width: "20px" }} className="bg-white">
          <img className="img-fluid" src={notesImage} alt="notes" />
        </div>
      </div>

      <Link
        to="/register"
        className="d-flex justify-content-center align-items-center mt-4 text-decoration-none text-white"
      >
        <p className="me-3 mb-0 d-none d-md-block">Register</p>
        <BsPersonFill />
      </Link>

      <div
        className="d-flex justify-content-center align-items-center mt-4"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        <p className="me-3 mb-0 d-none d-md-block">Logout</p>
        <BiLogOut />
      </div>
    </div>
  );
};

export default NotesSidebar;
