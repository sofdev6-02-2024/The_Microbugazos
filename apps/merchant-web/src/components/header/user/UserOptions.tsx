import useNavigate from "@/commons/hooks/UseNavigate";
import "@/styles/header/user/UserOptions.css";

interface Props {
  isLogged: boolean;
  isOpen: boolean;
}

export const UserOptions = ({ isLogged, isOpen }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={`user-options ${isOpen ? "open" : ""}`}>
      {isLogged ? (
        <>
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="user-options-option"
          >
            Profile
          </button>
          <button className="user-options-option log-out">Log out</button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            className="user-options-option"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="user-options-option"
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
};
