
// @mui material components
import Grid from "@mui/material/Grid";
import TwitterIcon from "@mui/icons-material/Twitter";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from "services/auth";import { isAuthenticated } from "services/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
 '../../services/auth'


function Profile() {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const token = getToken();
    axios
      .get("http://localhost:8080/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { name, email, role } = response.data;
        const roleName = role ? role.name : null;
        console.log(response.data);
        console.log(response.data.role.permissionIds )
        const permissions = response.data.role.permissionIds ? response.data.role.permissionIds.map((p) => p.name) : [];
        setProfileData({ name, email, role, permissions,roleName });
        console.log("aquui é a role")
        console.log(role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <DashboardLayout>
      <Header profileData={profileData} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Permissões do usuario:"
              description={profileData.permissions && profileData.permissions.length > 0 ? profileData.permissions.join(", ") : "Nenhuma permissão encontrada."}
              info={{
                Nome: profileData.name,
                Role: profileData.roleName,
                email: profileData.email,
              }}

              action={{ route: "", tooltip: "Edit User" }}
            />
          </Grid>
        </Grid>
      </SoftBox>


    </DashboardLayout>
  );
}

export default Profile;
