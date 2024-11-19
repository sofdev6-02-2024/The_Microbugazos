import useAuth from "@/hooks/useAuth";
import "@/styles/header/user/user-button.css";

interface Props {
  isLogged: boolean;
  toggleOpen: () => void;
}

export const UserButton = ({ isLogged, toggleOpen }: Props) => {
  const { user } = useAuth();

  return (
    <button className="user-button" onClick={toggleOpen}>
      {user?.displayName?.slice(0, 2) ?? "NA"}
      <span className={`user-button-alert ${!isLogged ? "alert" : ""}`}>!</span>
    </button>
  );
};
