import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { Autocomplete, Button, Dialog, DialogActions, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {   DialogContent } from "@mui/material";
export function formEdit(item) {}
export function initOpenDialog(item, isRemove) {}
export function setSamplingDateExport(item) {}
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import AuthorTableData from "./data/authorsTableData";
import AnaylisResult from "./data/projectsTableData";
import { useEffect, useState } from "react";
import SoftButton from "components/SoftButton";
import { toast } from "react-toastify";
import api from "services/api";
import moment from "moment/moment";
import { Refresh } from "@mui/icons-material";

function Tables() {
  const [showForm, setShowForm] = useState(false);
  const [analysisRequestId, setAnalysisRequestId] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const {
    authorsTableData: { rows, columns },
    loading,
    reloadData,
    setSearch,
    startAnalysis,
    removeAnalysis,
    setSamplingDate,
  } = AuthorTableData();

  const fetchCompanys = async (userId) => {
    console.log("iddddd", userId);
    const response = await api.get(`/companys/user/${userId}`);
    console.log(response);
    setCompanySuggestions(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get("/users/actives");
    setUserSuggestions(response.data);
  };

  const regex = /^REQ\d{2,}$/;
  async function handleSearch() {
    if (!regex.test(searchValue)) {
      toast.error("Insira um valor valido");
    }else{
      await setSearch(searchValue);
    }

  }

    useEffect(() => {
    formEdit = (item) => {
      setShowForm(true);
      setSelectedUser({name: item.userId.name, _id: item.userId._id});
      setSelectedCompany({name: item.companyId.name, _id: item.companyId._id});
      fetchCompanys(item.userId._id);
      setFormData({
        analysisRequestId: item._id,
        userId: item.userId._id,
        companyId: item.companyId._id,
        typeMilk: item.typeMilk,
        originMilk: item.originMilk,
        products: item.products,
        species: item.species,
        deliveryDate: moment(item.deliveryDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      });
      setIsEditing(true);
    };
  }, []);

  const onInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = (event) => {

    if (isEditing) {
      const analysisRequestId = formData.analysisRequestId;
      api
        .put(`/analysisRequest/${analysisRequestId}`, formData)
        .then((response) => {
          toast.success("Requisição de Analise atualizada com sucesso.");
          console.log("sucesso")
          reloadData();
        })
        .catch((error) => {
          console.log("entrou no catch")
          toast.error("Um erro ocorreu durante a Atualização", error);
          console.error("Error:", error);
        });
        event.preventDefault();
        setShowForm(false);
        setFormData({});
        setSelectedUser("");
        setSelectedCompany("");
    }else{
        api
          .post("/analysisRequest", formData)
          .then((response) => {
            console.log("sucesso")
            toast.success("Requisição de Analise cadastrada com sucesso.");
            reloadData();
          })
          .catch((error) => {
            toast.error("Um erro ocorreu durante a criação", error);
            console.error("Error:", error);
          });
        event.preventDefault();
        setShowForm(false);
        setFormData({});
        setSelectedUser("");
        setSelectedCompany("");
        }    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setSearchTerm(value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [formData, setFormData] = useState({
    analysisRequestId: "",
    companyId: "",
    userId: "",
    typeMilk: "",
    originMilk: "",
    products: "",
    species: "",
    deliveryDate: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isRemove, setIsRemove] = useState(false);


  useEffect(() => {
      initOpenDialog = (item, isRemove) => {
        if(isRemove) {
          setIsRemove(true);
        }else{
          setIsRemove(false);
        }
        console.log(isRemove);
        setOpenDialog(true);
        setAnalysisRequestId(item._id);
      }
  }, []);  

  useEffect(() => {
    setSamplingDateExport = (id) => {
      setAnalysisRequestId(id);
      setShowDatePicker(true);
    }
}, []);  

  const confirmStartAnalysis = () => {
    setOpenDialog(false);
    startAnalysis(analysisRequestId);
  }

  const confirmRemoveAnalysis = () => {
    setOpenDialog(false);
    removeAnalysis(analysisRequestId);
  }

  const setValueSamplingDate = () => {
    setSamplingDate(analysisRequestId, selectedDate);
    setShowDatePicker(false);
    setSelectedDate("");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>         
            {!showForm && (              
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                   <Dialog open={showDatePicker}  fullWidth={false} onClose={() => setOpenDialog(false)} >
                      <DialogTitle>Informe a data de Coleta</DialogTitle>
                      <DialogActions>
                        <TextField id="date" type="date" color="info" required defaultValue="" value={selectedDate} onChange={handleDateChange} />
                        <IconButton size="large"  color="error" title="Cancelar" onClick={() => setShowDatePicker(false)} >
                          <CloseIcon />
                        </IconButton>
                        <IconButton size="large" color="success" title="Enviar" onClick={() => setValueSamplingDate()} >
                          <CheckIcon/>
                        </IconButton>
                      </DialogActions>
                    </Dialog>


                    <Dialog open={openDialog && !isRemove}  fullWidth={false} onClose={() => setOpenDialog(false)} >
                          <DialogTitle>Confirmar início da análise</DialogTitle>
                          <DialogContent>
                            <p>Deseja realmente iniciar a análise?</p>
                          </DialogContent>
                          <DialogActions>
                            <SoftButton onClick={() => setOpenDialog(false)} color="error">Cancelar</SoftButton >
                            <SoftButton  onClick={confirmStartAnalysis} color="success" autoFocus>Iniciar</SoftButton >
                          </DialogActions>
                    </Dialog>
                    <Dialog open={openDialog && isRemove}  fullWidth={false} onClose={() => setOpenDialog(false)} >
                        <DialogTitle>Confirmar remoção da análise</DialogTitle>
                        <DialogContent>
                          <p>Deseja realmente remover a análise?</p>
                        </DialogContent>
                        <DialogActions>
                          <SoftButton color="error" onClick={() => setOpenDialog(false)}>Cancelar</SoftButton>
                          <SoftButton color="success" onClick={confirmRemoveAnalysis} autoFocus>Remover</SoftButton>
                        </DialogActions>
                    </Dialog>
                   
                <SoftTypography variant="h5">
                  Analíses Requisitadas
                  <IconButton size="large" color="success" title="Adicionar" onClick={() => setShowForm(true)}>
                        <AddIcon  />
                  </IconButton>
                </SoftTypography>

                <SoftBox >
                    <TextField
                      size="large"
                      style={{ width: '100px' }}
                      value={searchValue}
                      placeholder="ex REQ01"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <IconButton  size="large" color="warning" title="Pesquisar" onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>

                    <IconButton size="large" color="dark" title="Recarregar" onClick={reloadData}>
                          <Refresh />
                    </IconButton>
                </SoftBox>
              </SoftBox>
              
            )}
            {showForm && (
              <SoftBox p={3}>
                <form onSubmit={handleFormSubmit}>
                  <SoftBox
                    mb={3}
                    sx={{ backgroundColor: "#F5F5F5", borderRadius: "5px", padding: "10px" }}
                  >
                    <SoftTypography variant="h5" sx={{ color: "#008B8B" }}>
                      {isEditing ? 'Editar Requisição' : 'Nova Requisição'}
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={3}>
                    <Autocomplete
                      style={{ width: "50%" }}
                      id="userId"
                      options={userSuggestions}
                      getOptionLabel={(user) => user.name}
                      value={selectedUser}
                      onChange={(event, value) => {
                        if (value) {
                          console.log("valor abaixo")
                          console.log(value)
                          setSelectedUser(value);
                          setFormData((prevState) => ({ ...prevState, userId: value._id }));
                          fetchCompanys(value._id);
                        } else {
                          setSelectedUser(null);
                          setFormData((prevState) => ({ ...prevState, userId: "" }));
                          setCompanySuggestions([]);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Nome do Usuario"
                          variant="outlined"
                          value={searchTerm}
                          color="info"
                          onChange={onInputChange}
                          required
                          InputProps={{
                            ...params.InputProps,
                            sx: { fontSize: 16 },
                          }}
                          InputLabelProps={{
                            ...params.inputProps,
                            required: false,
                            sx: {
                              "&.Mui-focused": { fontSize: 12 },
                              fontSize: 16,
                            },
                            shrink: true,
                          }}
                          label={
                            <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                              Nome do Usuario
                            </Typography>
                          }
                        />
                      )}
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <Autocomplete
                      style={{ width: "50%" }}
                      id="companyId"
                      options={companySuggestions}
                      value={selectedCompany}
                      getOptionLabel={(company) => company.name}
                      onChange={(event, value) => {
                        if (value) {
                          setSelectedCompany(value);
                          setFormData((prevState) => ({ ...prevState, companyId: value._id }));
                        } else {
                          setSelectedCompany(null);
                          setFormData((prevState) => ({ ...prevState, companyId: "" }));
                          onCompanySelect("");
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Nome da Empresa"
                          variant="outlined"
                          value={searchTerm}
                          onChange={onInputChange}
                          color="info"
                          required
                          InputProps={{
                            ...params.InputProps,
                            sx: { fontSize: 16 },
                          }}
                          InputLabelProps={{
                            ...params.inputProps,
                            required: false,
                            sx: {
                              "&.Mui-focused": { fontSize: 12 },
                              fontSize: 16,
                            },
                            shrink: true,
                          }}
                          label={
                            <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                              Nome da Empresa
                            </Typography>
                          }
                        />
                      )}
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <TextField
                      id="typeMilk"
                      name="typeMilk"
                      placeholder="Tipo de Leite"
                      variant="outlined"
                      value={formData.typeMilk}
                      onChange={handleChange}
                      required
                      sx={{ width: "50%" }}
                      color="info"
                      InputLabelProps={{
                        required: false,
                        sx: {
                          "&.Mui-focused": { fontSize: 12 }, 
                          fontSize: 16, 
                        },
                        shrink: true, 
                      }}
                      InputProps={{
                        sx: { fontSize: 16 }, 
                      }}
                      label={
                        <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                          Tipo de Leite
                        </Typography>
                      }
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <TextField
                      id="originMilk"
                      name="originMilk"
                      placeholder="Origem do Leite"
                      variant="outlined"
                      value={formData.originMilk}
                      onChange={handleChange}
                      required
                      color="info"
                      sx={{ width: "50%" }}
                      InputLabelProps={{
                        required: false,
                        sx: {
                          "&.Mui-focused": { fontSize: 12 }, 
                          fontSize: 16, 
                        },
                        shrink: true, 
                      }}
                      InputProps={{
                        sx: { fontSize: 16 }, 
                      }}
                      label={
                        <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                          Origem do Leite
                        </Typography>
                      }
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <TextField
                      id="products"
                      name="products"
                      variant="outlined"
                      placeholder="Produtos"
                      value={formData.products}
                      onChange={handleChange}
                      required
                      color="info"
                      sx={{ width: "50%" }}
                      InputLabelProps={{
                        required: false,
                        sx: {
                          "&.Mui-focused": { fontSize: 12 }, 
                          fontSize: 16, 
                        },
                        shrink: true, 
                      }}
                      InputProps={{
                        sx: { fontSize: 16 }, 
                      }}
                      label={
                        <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                          Produtos
                        </Typography>
                      }
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <TextField
                      id="species"
                      name="species"
                      placeholder="Espécies"
                      value={formData.species}
                      onChange={handleChange}
                      required
                      color="info"
                      sx={{ width: "50%" }}
                      InputLabelProps={{
                        required: false,
                        sx: {
                          "&.Mui-focused": { fontSize: 12 }, 
                          fontSize: 16, 
                        },
                        shrink: true, 
                      }}
                      InputProps={{
                        sx: { fontSize: 16 }, 
                      }}
                      label={
                        <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                          Espécies
                        </Typography>
                      }
                    />
                  </SoftBox>
                  <SoftBox mb={3}>
                    <TextField
                      id="date"
                      label="Data da Entrega"
                      name="deliveryDate"
                      type="date"
                      color="info"
                      required
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </SoftBox>
                  <SoftBox display="flex" justifyContent="flex-end">
                    <SoftButton
                      type="button"
                      color="error"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({});
                        setSelectedCompany(null);
                        setSelectedUser(null);
                        setIsEditing(false);
                      }}
                      style={{ marginRight: "8px" }}
                    >
                      Cancelar
                    </SoftButton>
                    {isEditing ? (
                        <SoftButton type="submit" color="warning">
                          Atualizar
                        </SoftButton> 
                    ):
                        <SoftButton type="submit" color="success">
                          Enviar
                        </SoftButton>
                    }
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
              {loading ? null : <Table columns={columns} rows={rows} />}
            </SoftBox>
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Resultado das analises</SoftTypography>
          </SoftBox>
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
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tables;
