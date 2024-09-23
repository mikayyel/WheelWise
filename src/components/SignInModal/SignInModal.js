import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  boxShadow: 24,
  borderRadius: "10px",
  overflow: "hidden",
  zIndex: 1000,
};

export default function SignInModal({ isOpen = true, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    if (pathname === "/sell") {
      isOpen = false;
      navigate("/");
    } else {
      onClose();
    }
  };

  return (
    <div>
      <Modal
        keepMounted
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <SignIn boxHeight={"auto"} isModal={isOpen} />
        </Box>
      </Modal>
    </div>
  );
}
