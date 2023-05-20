import { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

function NewAnalysisRequestForm({ onClose }) {
  const [formData, setFormData] = useState({
    companyId: "",
    userId: "",
    typeMilk: "",
    originMilk: "",
    products: "",
    species: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar o formData para o servidor
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <SoftBox mb={3}>
        <SoftTypography variant="h6">Nova Requisição</SoftTypography>
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="companyId">ID da Empresa:</label>
        <input
          type="text"
          name="companyId"
          id="companyId"
          value={formData.companyId}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="userId">ID do Usuário:</label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={formData.userId}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="typeMilk">Tipo de Leite:</label>
        <input
          type="text"
          name="typeMilk"
          id="typeMilk"
          value={formData.typeMilk}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="originMilk">Origem do Leite:</label>
        <input
          type="text"
          name="originMilk"
          id="originMilk"
          value={formData.originMilk}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="products">Produtos:</label>
        <input
          type="text"
          name="products"
          id="products"
          value={formData.products}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox mb={3}>
        <label htmlFor="species">Espécies:</label>
        <input
          type="text"
          name="species"
          id="species"
          value={formData.species}
          onChange={handleChange}
        />
      </SoftBox>
      <SoftBox display="flex" justifyContent="flex-end">
        <SoftButton type="button" onClick={onClose} mr={1}>
          Cancelar
        </SoftButton>
        <SoftButton type="submit" color="success">
          Enviar
        </SoftButton>
      </SoftBox>
    </form>
  );
}

export default NewAnalysisRequestForm;