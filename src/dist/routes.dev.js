"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.routePaths = exports.routeLayout = void 0;

var _Dashboard = _interopRequireDefault(require("./views/Dashboard/Dashboard.js"));

var _ShortListedWarehouses = _interopRequireDefault(require("./views/ShortListedWarehouses/ShortListedWarehouses.js"));

var _Apartment = _interopRequireDefault(require("@material-ui/icons/Apartment"));

var _DepartureBoard = _interopRequireDefault(require("@material-ui/icons/DepartureBoard"));

var _Settings = _interopRequireDefault(require("@material-ui/icons/Settings"));

var _EventAvailable = _interopRequireDefault(require("@material-ui/icons/EventAvailable"));

var _RegularTables = _interopRequireDefault(require("./views/Tables/RegularTables.js"));

var _TourReq = _interopRequireDefault(require("./views/Tables/TourReq.js"));

var _ResReq = _interopRequireDefault(require("./views/Tables/ResReq.js"));

var _Settings2 = _interopRequireDefault(require("./views/Pages/Settings"));

var _MyWarehouse = _interopRequireDefault(require("./views/Pages/MyWarehouse"));

var _WarehouseDetails = _interopRequireDefault(require("./views/Pages/WarehouseDetails"));

var _Performances = _interopRequireDefault(require("./views/Pages/Performances"));

var _Documentation = _interopRequireDefault(require("./views/Pages/Documentation.jsx"));

var _Notification = _interopRequireDefault(require("./views/Pages/Notification"));

var _Manager = _interopRequireDefault(require("./views/Pages/Manager"));

var _EditProfile = _interopRequireDefault(require("./views/Pages/EditProfile"));

var _ViewWarehouse = _interopRequireDefault(require("./views/Pages/ViewWarehouse"));

var _StoreMallDirectory = _interopRequireDefault(require("@material-ui/icons/StoreMallDirectory"));

var _Notifications = _interopRequireDefault(require("@material-ui/icons/Notifications"));

var _Dashboard2 = _interopRequireDefault(require("@material-ui/icons/Dashboard"));

var _SupervisorAccount = _interopRequireDefault(require("@material-ui/icons/SupervisorAccount"));

var _HowToReg = _interopRequireDefault(require("@material-ui/icons/HowToReg"));

var _Input = _interopRequireDefault(require("@material-ui/icons/Input"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Description = _interopRequireDefault(require("@material-ui/icons/Description"));

var _Person = _interopRequireDefault(require("@material-ui/icons/Person"));

var _Equalizer = _interopRequireDefault(require("@material-ui/icons/Equalizer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @material-ui/icons
var routeLayout = {
  auth: "/auth",
  customer: "/customer"
};
exports.routeLayout = routeLayout;
var routePaths = {
  login: "/login",
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
  notification: "/notification"
}; // var dashRoutes = [
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

exports.routePaths = routePaths;
var dashRoutes = [{
  path: routePaths.dashboard,
  name: "My Warehouses",
  icon: _StoreMallDirectory["default"],
  component: _MyWarehouse["default"],
  layout: routeLayout.customer
}, {
  path: routePaths.tour,
  name: "Tours Requested",
  icon: _DepartureBoard["default"],
  component: _TourReq["default"],
  layout: routeLayout.customer
}, {
  path: routePaths.res,
  name: "Reservations Requested",
  icon: _EventAvailable["default"],
  component: _ResReq["default"],
  layout: routeLayout.customer
}, {
  path: routePaths.myWarehouseDetail + "/:id",
  name: "Warehouse Details",
  icon: _StoreMallDirectory["default"],
  component: _WarehouseDetails["default"],
  layout: routeLayout.customer,
  hidden: true
}, {
  path: routePaths.performance,
  name: "Performance",
  icon: _Equalizer["default"],
  component: _Performances["default"],
  layout: routeLayout.customer,
  getWarehouse: true
}, {
  path: routePaths.documentation,
  name: "Documentation",
  icon: _Description["default"],
  component: _Documentation["default"],
  layout: routeLayout.customer,
  getWarehouse: true
}, {
  path: routePaths.manager,
  name: "Relationship Manager",
  icon: _Person["default"],
  component: _Manager["default"],
  layout: routeLayout.customer
}, {
  path: routePaths.notification,
  name: "Notification",
  icon: _Notifications["default"],
  component: _Notification["default"],
  layout: routeLayout.customer,
  getWarehouse: true
}, {
  collapse: false,
  name: "Edit Profile",
  path: routePaths.editProfile,
  component: _EditProfile["default"],
  layout: routeLayout.customer,
  hidden: true
}, {
  collapse: false,
  name: "View Profile",
  path: routePaths.viewProfile,
  component: _ViewWarehouse["default"],
  layout: routeLayout.customer,
  hidden: true
}];
var _default = dashRoutes;
exports["default"] = _default;