import { Link } from "react-router";
import ConfirmationButton from "@/components/shared/confirmation-button";
import { logout } from "../service";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "../../../store";
import { authLogout } from "@/store/actions";


function LogoutButton() {
  //const { onLogout } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(authLogout());
  };

  return (
    <ConfirmationButton
      variant="outline"
      confirmation="Are you sure you want to log out?"
      confirmButton={
        <Button onClick={handleLogout} variant="destructive">
          Yes
        </Button>
      }
    >
      Log out
    </ConfirmationButton>
  );
}

export default function AuthButton() {
  const isLogged = useAppSelector((state) => state.auth)
  

  if (isLogged) {
    return <LogoutButton />;
  }

  return <Link to="/login">Login</Link>;
}
