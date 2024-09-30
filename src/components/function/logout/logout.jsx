import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export function LogoutButton() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        try {
            // Clear storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Navigate to home page
            navigate("/");
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div className="logoutButton">
            <div className="logout flex-center" onClick={handleSignOut}>
                <LogoutIcon fontSize="medium" />
                Log Out
            </div>
        </div>
    );
}
