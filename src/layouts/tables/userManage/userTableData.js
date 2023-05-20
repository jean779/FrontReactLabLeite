import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import axios from 'axios';
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSoftUIController} from "context";
import SoftButton from "components/SoftButton";
import Avatar from '@material-ui/core/Avatar';

export const colors = {
  primary: ['#7928ca', '#ff0080'],
  secondary: ['#627594', '#a8b8d8'],
  info: ['#2152ff', '#21d4fd'],
  success: ['#17ad37', '#98ec2d'],
  warning: ['#f53939', '#fbcf33'],
  error: ['#ea0606', '#ff667c'],
  light: ['#ced4da', '#ebeff4'],
  dark: ['#141727', '#3a416f']
};

function User({ name}) {
  const [controller, dispatch] = useSoftUIController();
  const { sidenavColor } = controller;
  const colorCode = sidenavColor && colors[sidenavColor] ? colors[sidenavColor][0] : '';
  const initials = name.split(' ').map(word => word[0]).join('');

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <Avatar  style={{ background: colorCode  }}>{initials}</Avatar>
      </SoftBox>
    </SoftBox>
  );
}




function UserTableData() {




  const [userData, setUserData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  
  useEffect(() => {
    axios
      .get('http://localhost:8080/users/actives')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditClick = (id) => {
    const item = userData.find((data) => data._id === id);
    setSelectedItem(item);
    setShowForm(true);
    console.log(item);
  }

  
  const userTableData = {
    columns: [
      { name: "User", align: "left" },
      { name: "Nome", align: "left" },
      { name: "Email", align: "left" },
      { name: "action", align: "center" },
    ],
    
    rows:  userData.length > 0 ? userData.map((data) => ({
      
      User: <User image={team2} name={data.name} email={data.email} />,
      "Nome": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.name}

        </SoftTypography>
      ),
       "Email": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {data.email}

        </SoftTypography>
      ),
       action: (
         <SoftTypography
           component="a"
           href="#"
           variant="caption"
           color="secondary"
           fontWeight="medium"
           onClick={() => handleEditClick(data._id)}
         >
           Edit
         </SoftTypography>
       ),
     })): [
      {
        author: (
          <SoftTypography variant="caption" color="secondary">
            Sem requisições de análises encontradas
          </SoftTypography>
        ),
        function: null,
        status: null,
        employed: null,
        action: null,
      },
    ]};

  return userTableData;
}

export default UserTableData;


