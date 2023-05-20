
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes, Link} from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import UserManage from "layouts/tables/userManage";


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes2 = () => (
  <BrowserRouter>
    <Route>
      <PrivateRoute path="/profile" element={<Profile />} />
    </Route>
  </BrowserRouter>
);

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Analíses Requisitadas",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Amostras Coletadas",
    key: "AmostrasColetada",
    route: "/AmostrasColetada",
    icon: <Document size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Resultado das Analises",
    key: "resultAnalysis",
    route: "/resultAnalysis",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
    userRole: "master"
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    
  },
  {
    type: "collapse",
    name: "Gerenciamento de Usuários",
    key: "userManage",
    route: "/userManage",
    icon: <CustomerSupport size="12px" />,
    component: <UserManage />,
    noCollapse: true,
    
  },


];

export default routes;
