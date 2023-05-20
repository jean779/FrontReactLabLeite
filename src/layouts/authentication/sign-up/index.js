/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from "react-toastify";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import './singUp.css';

// Images
import curved6 from "assets/images/curved-images/singup.jpg";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import api from "services/api";
import { Autocomplete, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';


function SoftCloseButton({ onClose }) {
  return (
    <IconButton size="small" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}


function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [showError, setShowError] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleSuggestions, setRoleSuggestions] = useState([]);

  
  const onInputChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const handleCloseError = () => {
    setError("");
    setShowError(false);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role_id: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8080/roles');
    const roles = await response.json();
    setRoleSuggestions(roles);
  };

  const handleSignUp = () => {
    if (!user.name) {
      setError('Por favor, preencha o campo Nome.');
      setShowError(true);
      return;
    }

    // Verifica se o campo email está vazio e se é um email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      setError('Por favor, insira um e-mail válido.');
      setShowError(true);
      return;
    }

    // Verifica se o campo senha está vazio
    if (!user.password) {
      setError('Por favor, preencha o campo Senha.');
      setShowError(true);
      return;
    }

    // Verifica se o campo papel está vazio
    if (!user.role_id) {
      setError('Por favor, selecione um papel.');
      setShowError(true);
      return;
    }else{
      axios
        api.post("/user", user)
        .then((response) => {
          toast.success('Cadastro realizado com sucesso');
          navigate('/authentication/sign-in');
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            setError(error.response.data.message);
          } else {
            setError("An error occurred");
          }
          setShowError(true);
        });
      }   
  };
  
  useEffect(() => {
    api.get("/roles")
      .then(response => {
        setRoles(response.data);
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <BasicLayout
      title="Bem-vindo!"
      description="Crie uma conta gratuita no Dairy Scan e aproveite ao máximo nossa plataforma."
      image={curved6}
    >
      <Card>
        <SoftBox pt={2} pb={3} px={3}>
          {showError && error && (
            <SoftBox display="flex" alignItems="center" mb={2}>
              <SoftTypography variant="body2" color="error">
                {error}
              </SoftTypography>
              <SoftCloseButton onClose={handleCloseError} ml={1} />
            </SoftBox>
          )}

          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput placeholder="Name" 
                        value={user.name} 
                        onChange={(e) => setUser({ ...user, name: e.target.value })}/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="Email" 
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Password" 
               value={user.password}
               onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </SoftBox>
           
           
              <SoftBox  mb={3}>        
                  <Autocomplete
                    id="roleId"
                    options={roleSuggestions}
                    getOptionLabel={(role) => role.name}
                    color="info"
                    onChange={(event, value) => {
                      if (value) {
                        setUser({ ...user, role_id: value._id });
                      } else {
                        setUser({ ...user, role_id: '' });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth="true"
                        placeholder="Papel"
                        defaultValue="teste"
                        variant="outlined"
                        value={searchTerm}
                        color="info"
                        onChange={onInputChange}
                        required
                      />
                    )}
                  />
               </SoftBox>         
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSignUp}>
                Cadastre-se
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                                
                Já tem uma conta?
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Entrar
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}


export default SignUp;
