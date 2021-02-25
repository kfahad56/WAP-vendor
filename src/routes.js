/* eslint-disable */
import Dashboard from "views/Pages/Dashboard";
import RegularTables from "views/Tables/RegularTables";
import MyWarehouse from "views/Pages/MyWarehouse";
import AddWarehouses from "views/Tables/AddWarehouses";
import CreateWarehouse from "views/Pages/CreateWarehouse";
import EditWarehouse from "views/Pages/EditWarehouse";
import ViewWarehouse from "views/Pages/ViewWarehouse";
import WarehouseDetails from "views/Pages/WarehouseDetails";
// import LoginPage from "views/Pages/LoginPage";
import Performances from "views/Pages/Performances";
import Documentation from "views/Pages/Documentation";
import Notification from "views/Pages/Notification";
import Contract from "views/Pages/Contract";
import Manager from "views/Pages/Manager";
import EditProfile from "views/Pages/EditProfile";
import VendorForm from "views/Pages/VendorForm";

// @material-ui/icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/SupervisorAccount";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import SettingsIcon from "@material-ui/icons/Settings";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Settings from "./views/Pages/Settings";
import Test from "views/Pages/Test";
import FeedbackIcon from "@material-ui/icons/Feedback";

export const routeLayout = {
  auth: "/auth",
  vendor: "/vendor",
};

export const routePaths = {
  login: "/login",
  dashboard: "/dashboard",
  documentation: "/documentation",
  myWarehouse: "/my-warehouse",
  performance: "/performance",
  manager: "/relationship-manager",
  myWarehouseDetail: "/warehouse-detail",
  pendingWarehose: "/pending-warehouse",
  createWarehouse: "/create-warehouse",
  editWarehouse: "/edit-warehouse",
  viewWarehouse: "/view-warehouse",
  editProfile: "/edit-profile",
  viewProfile: "/view-profile",
  register: "/register",
  notification: "/notification",
  settings: "/settings",
  contract: "/contract",
  feedback: "/feedback",
  test: "/test",
};

var dashRoutes = [
  {
    path: routePaths.dashboard,
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: routeLayout.vendor,
  },
  {
    path: routePaths.myWarehouse,
    name: "My Warehouses",
    icon: StoreMallDirectoryIcon,
    component: MyWarehouse,
    layout: routeLayout.vendor,
  },
  {
    path: routePaths.myWarehouseDetail + "/:id",
    name: "Warehouse Details",
    icon: StoreMallDirectoryIcon,
    component: WarehouseDetails,
    layout: routeLayout.vendor,
    hidden: true,
  },
  // {
  //   path: routePaths.performance,
  //   name: "Performance",
  //   icon: EqualizerIcon,
  //   component: Performances,
  //   layout: routeLayout.vendor,
  //   getWarehouse: true,
  // },
  {
    path: routePaths.documentation,
    params: "/:id",
    name: "Documentation",
    icon: DescriptionIcon,
    component: Documentation,
    layout: routeLayout.vendor,
    // getWarehouse: true,
  },
  {
    path: routePaths.documentation,
    hidden: true,
    name: "Documentation",
    icon: DescriptionIcon,
    component: Documentation,
    layout: routeLayout.vendor,
    // getWarehouse: true,
  },
  {
    path: routePaths.notification,
    params: "/:id",
    name: "Notification",
    icon: NotificationsIcon,
    component: Notification,
    layout: routeLayout.vendor,
    getWarehouse: true,
  },
  {
    path: routePaths.notification,
    hidden: true,
    name: "Notification",
    icon: NotificationsIcon,
    component: Notification,
    layout: routeLayout.vendor,
    getWarehouse: true,
  },
  {
    path: routePaths.feedback,
    name: "Feedback",
    icon: FeedbackIcon,
    component: VendorForm,
    layout: routeLayout.vendor,
  },
  {
    path: routePaths.manager,
    name: "Relationship Manager",
    icon: PersonIcon,
    component: Manager,
    layout: routeLayout.vendor,
  },
  {
    path: routePaths.createWarehouse,
    name: "Create Warehouse",
    icon: AddIcon,
    component: CreateWarehouse,
    layout: routeLayout.vendor,
    hidden: true,
  },
  {
    path: routePaths.editWarehouse + "/:id",
    name: "Edit Warehouse",
    icon: InputIcon,
    component: EditWarehouse,
    layout: routeLayout.vendor,
    hidden: true,
  },
  {
    collapse: false,
    name: "View Warehouse",
    path: routePaths.viewWarehouse + "/:id",
    component: ViewWarehouse,
    layout: routeLayout.vendor,
    hidden: true,
  },
  {
    collapse: false,
    name: "Edit Profile",
    path: routePaths.editProfile,
    component: EditProfile,
    layout: routeLayout.vendor,
    hidden: true,
  },
  {
    collapse: false,
    name: "View Profile",
    path: routePaths.viewProfile,
    component: ViewWarehouse,
    layout: routeLayout.vendor,
    hidden: true,
  },
  // {
  //   collapse: false,
  //   name: "Logout",
  //   icon: InputIcon,
  //   state: "formsCollapse",
  //   path: routePaths.login,
  //   component: LoginPage,
  //   layout: routeLayout.auth,
  // },
  {
    path: routePaths.settings,
    name: "Settings",
    icon: SettingsIcon,
    component: Settings,
    layout: routeLayout.vendor,
    hidden: true,
  },
  {
    path: routePaths.contract + "/:id",
    hidden: true,
    name: "Contractual Agreement",
    icon: SettingsIcon,
    component: Contract,
    layout: routeLayout.vendor,
  },
  // {
  //   path: routePaths.contract,
  //   params: "/:id",
  //   name: "Contractual Agreement",
  //   icon: SettingsIcon,
  //   component: Contract,
  //   layout: routeLayout.vendor,
  // },
  {
    path: routePaths.test,
    hidden: true,
    name: "Test",
    component: Test,
    layout: routeLayout.vendor,
  },
];
export default dashRoutes;
