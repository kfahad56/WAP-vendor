import Dashboard from "./views/Dashboard/Dashboard.js";
import ShortListedWarehouses from "./views/ShortListedWarehouses/ShortListedWarehouses.js";
import ApartmentIcon from "@material-ui/icons/Apartment";
import DepartureBoardIcon from "@material-ui/icons/DepartureBoard";
import SettingsIcon from "@material-ui/icons/Settings";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import RegularTables from "./views/Tables/RegularTables.js";
import TourReq from "./views/Tables/TourReq.js";
import ResReq from "./views/Tables/ResReq.js";
import Settings from "./views/Pages/Settings.js";
import MyWarehouse from "./views/Pages/MyWarehouse";
import WarehouseDetails from "./views/Pages/WarehouseDetails";
import Performances from "./views/Pages/Performances";
import Documentation from "./views/Pages/Documentation.jsx";
import Notification from "./views/Pages/Notification";
import CustomerForm from "./views/Pages/CustomerForm";
import Manager from "./views/Pages/Manager";
import EditProfile from "./views/Pages/EditProfile";
import ViewWarehouse from "./views/Pages/ViewWarehouse";
import Contract from "./views/Pages/Contract";

// @material-ui/icons
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FeedbackIcon from "@material-ui/icons/Feedback";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/SupervisorAccount";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Tour from "./views/Tables/TourReq.js";

export const routeLayout = {
  auth: "/auth",
  customer: "/customer",
};

export const routePaths = {
  login: "/login",
  settings: "/settings",
  dashboard: "/dashboard",
  tour: "/tours",
  res: "/reservations",
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
  contract: "/contract",
  Feedback: "/feedback",
};

// var dashRoutes = [
//   {
//     path: "/dashboard",
//     name: "My Warehouses",
//     icon: StoreMallDirectoryIcon,
//     component: Dashboard,
//     layout: "/admin"
//   },
//   {
//     path: "/shortlisted-wareouses",
//     name: "Shortlisted Warehouses",
//     icon: ApartmentIcon,
//     component: ShortListedWarehouses,
//     layout: "/admin"
//   },
//   {
//     path: "/tour-request",
//     name: "Tours Requested",
//     icon: DepartureBoardIcon,
//     component: TourReq,
//     layout: "/admin"
//   },
//   {
//     path: "/reservation-req",
//     name: "Reservations Requested",
//     icon: EventAvailableIcon,
//     component: ResReq,
//     layout: "/admin"
//   },
//   {
//     path: "/settings",
//     name: "Settings",
//     icon: SettingsIcon,
//     component: Settings,
//     layout: "/admin"
//   },

// ];
// export default dashRoutes;
var dashRoutes = [
  {
    path: routePaths.dashboard,
    name: "My Warehouses",
    icon: StoreMallDirectoryIcon,
    component: MyWarehouse,
    layout: routeLayout.customer,
  },
  {
    path: routePaths.tour,
    name: "Tours Requested",
    icon: DepartureBoardIcon,
    component: Tour,
    layout: routeLayout.customer,
  },
  // {
  //   path: routePaths.res,
  //   name: "Reservations Requested",
  //   icon: EventAvailableIcon,
  //   component: ResReq,
  //   layout: routeLayout.customer,
  // },
  {
    path: routePaths.myWarehouseDetail + "/:id",
    name: "Warehouse Details",
    icon: StoreMallDirectoryIcon,
    component: WarehouseDetails,
    layout: routeLayout.customer,
    hidden: true,
  },
  // {
  //   path: routePaths.performance,
  //   name: "Performance",
  //   icon: EqualizerIcon,
  //   component: Performances,
  //   layout: routeLayout.customer,
  //   getWarehouse: true,
  // },
  {
    path: routePaths.documentation,
    // name: "Contractual Agreements",
    name: "Documentation",
    icon: DescriptionIcon,
    component: Documentation,
    layout: routeLayout.customer,
    // getWarehouse: true,
  },
  {
    path: routePaths.manager,
    name: "Relationship Manager",
    icon: PersonIcon,
    component: Manager,
    layout: routeLayout.customer,
  },
  {
    path: routePaths.notification,
    params: "/:id",
    name: "Notification",
    icon: NotificationsIcon,
    component: Notification,
    layout: routeLayout.customer,
    getWarehouse: true,
  },
  {
    path: routePaths.notification,
    hidden: true,
    name: "Notification",
    icon: NotificationsIcon,
    component: Notification,
    layout: routeLayout.customer,
    getWarehouse: true,
  },
  {
    path: routePaths.Feedback,
    name: "Feedback",
    icon: FeedbackIcon,
    component: CustomerForm,
    layout: routeLayout.customer,
  },
  {
    collapse: false,
    name: "Edit Profile",
    path: routePaths.editProfile,
    component: EditProfile,
    layout: routeLayout.customer,
    hidden: true,
  },
  {
    collapse: false,
    name: "View Profile",
    path: routePaths.viewProfile,
    component: ViewWarehouse,
    layout: routeLayout.customer,
    hidden: true,
  },
  {
    path: routePaths.settings,
    name: "Settings",
    icon: SettingsIcon,
    component: Settings,
    layout: routeLayout.customer,
    hidden: true,
  },
  {
    path: routePaths.contract + "/:id",
    hidden: true,
    name: "Contractual Agreement",
    icon: SettingsIcon,
    component: Contract,
    layout: routeLayout.customer,
    hidden: true,
  },
];
export default dashRoutes;
