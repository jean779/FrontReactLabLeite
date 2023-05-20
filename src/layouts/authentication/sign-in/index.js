import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import 'react-toastify/dist/ReactToastify.css';

// Images
import curved9 from "assets/images/curved-images/teste2.jpg";
import axios from "axios";
import { login } from "services/auth";

function SoftCloseButton({ onClose }) {
  return (
    <IconButton size="small" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}

function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseError = () => {
    setError("");
    setShowError(false);
    console.log("Closing error message");
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password
      });

      if (response.status === 200) {
        toast.success("Login realizado com sucesso");
        login(response.data.token);
        localStorage.setItem("userRole", JSON.stringify(response.data.role));
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError("Invalid email or passwords");
      } else {
        setError("An error occurred");
      }
      setShowError(true);
    }
  }
  

  return (
    <CoverLayout
    title="Bem vindo ao Dairy Scan"
    description="Insira seu email e senha"
    image={curved9}
  >
    <SoftBox component="form" role="form">
    {error && (
            <SoftBox display="flex" alignItems="center" mb={2}>
              <SoftTypography variant="body2" color="error">
                {error}
              </SoftTypography>
              <SoftCloseButton onClose={handleCloseError} ml={1} />
            </SoftBox>
          )}
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Email
          </SoftTypography>
        </SoftBox>
        <SoftInput type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Password
          </SoftTypography>
        </SoftBox>
        <SoftInput type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </SoftBox>      
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
            Entrar
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Ainda não possui um cadastro?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Cadastre-se 
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
