
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import {Autocomplete, Grid, TextField}from '@mui/material';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';





import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import axios from "axios";
import { toast } from "react-toastify";
import UserTableData from "./userTableData";
import Table from "examples/Tables/Table";



TextField
function UserManage() {
  const [updateTable, setUpdateTable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAnalysisRequest, setNewAnalysisRequest] = useState({});
  

  const [searchTerm, setSearchTerm] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [roleSuggestions, setRoleSuggestions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));


 
  
  const { rows, columns} = UserTableData();

 
/*
  function updateTableData(){
    const { rows, columns} = AuthorTableData();
  }
  tentativa de atualizacao 
 */


  const fetchRoles = async () => {
    const response = await axios.get(`http://localhost:8080/roles`);
    console.log(response)
    const roles = response.data;
    setRoleSuggestions(roles);
  };
  useEffect(() => {
    fetchRoles();

  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:8080/users/actives');
    const users = await response.json();
    setUserSuggestions(users);
  };

  const onInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  

  const handleFormSubmit = (event) => {
    console.log("chegou aqui")
    console.log(formData);
    axios.post('http://localhost:8080/analysisRequest', formData)
    .then(response => {
      toast.success('Requisição de Analise cadastrada com sucesso.');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    event.preventDefault();
    setShowForm(false);
    setFormData({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setSearchTerm(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [formData, setFormData] = useState({
    companyId: "",
    userId: "",
    typeMilk: "",
    originMilk: "",
    products: "",
    species: "",
    deliveryDate: "",
  });
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3} >
          <Card >
          {!showForm && (
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">Todos os usuários ativos</SoftTypography>
                <SoftButton variant="contained" color="success" onClick={() => setShowForm(true)}>Novo Usuário</SoftButton>
              </SoftBox>
          )}
            {showForm && (
              <SoftBox p={3}>
                <form onSubmit={handleFormSubmit}>
                    <SoftBox mb={3} sx={{backgroundColor: '#F5F5F5', borderRadius: '5px', padding: '10px'}}>
                      <SoftTypography variant="h5"sx={{color: '#008B8B'}}>Novo Usuário</SoftTypography>
                    </SoftBox>            
                    <SoftBox  mb={3}>
                       <TextField
                          id="typeMilk"
                          name="typeMilk"
                          label="Nome"
                          variant="outlined"
                          value={formData.typeMilk}
                          onChange={handleChange}
                          required
                          sx={{ width: '50%' }}
                          color="info"
                        />
                    </SoftBox>
                    <SoftBox mb={3}>
                      <TextField
                            id="originMilk"
                            name="originMilk"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={formData.originMilk}
                            onChange={handleChange}
                            required
                            color="info"
                            sx={{ width: '50%' }}
                          />
                    </SoftBox>
                    <SoftBox mb={3}>
                      <TextField
                          id="products"
                          name="products"
                          label="Senha"
                          type="password"
                          variant="outlined"
                          value={formData.products}
                          onChange={handleChange}
                          required
                          color="info"
                          sx={{ width: '50%' }}
                        />
                    </SoftBox>
                    <SoftBox  mb={3}>     
                      <Autocomplete 
                        style={{ width: '50%' }}
                              id="companyId"
                              options={roleSuggestions}
                              getOptionLabel={(company) => company.name}
                              onChange={(event, value) => {
                                if (value) {
                                  setFormData((prevState) => ({ ...prevState, companyId: value._id }));
                                } else {
                                  setFormData((prevState) => ({ ...prevState, companyId: '' }));
                                  onCompanySelect('');
                                }
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Nome da Empresa"
                                  variant="outlined"
                                  value={searchTerm}
                                  onChange={onInputChange}
                                  color="info"
                                  required
                                />
                              )}
                            />
                    </SoftBox>
                    <SoftBox display="flex" justifyContent="flex-end">
                      <SoftButton type="button" color="error" onClick={() => setShowForm(false)} style={{ marginRight: '8px' }}>
                        Cancelar
                      </SoftButton>
                      <SoftButton type="submit" color="success"   >
                        Enviar
                      </SoftButton>
                    </SoftBox>
    
                  </form>  
              </SoftBox>
            )}
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows}  />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default UserManage;
