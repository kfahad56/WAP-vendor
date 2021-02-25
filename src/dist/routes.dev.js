"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.routePaths = exports.routeLayout = void 0;

var _Dashboard = _interopRequireDefault(require("views/Pages/Dashboard"));

var _RegularTables = _interopRequireDefault(require("views/Tables/RegularTables"));

var _MyWarehouse = _interopRequireDefault(require("views/Pages/MyWarehouse"));

var _AddWarehouses = _interopRequireDefault(require("views/Tables/AddWarehouses"));

var _CreateWarehouse = _interopRequireDefault(require("views/Pages/CreateWarehouse"));

var _EditWarehouse = _interopRequireDefault(require("views/Pages/EditWarehouse"));

var _ViewWarehouse = _interopRequireDefault(require("views/Pages/ViewWarehouse"));

var _WarehouseDetails = _interopRequireDefault(require("views/Pages/WarehouseDetails"));

var _Performances = _interopRequireDefault(require("views/Pages/Performances"));

var _Documentation = _interopRequireDefault(require("views/Pages/Documentation"));

var _Notification = _interopRequireDefault(require("views/Pages/Notification"));

var _Manager = _interopRequireDefault(require("views/Pages/Manager"));

var _EditProfile = _interopRequireDefault(require("views/Pages/EditProfile"));

var _Notifications = _interopRequireDefault(require("@material-ui/icons/Notifications"));

var _Dashboard2 = _interopRequireDefault(require("@material-ui/icons/Dashboard"));

var _SupervisorAccount = _interopRequireDefault(require("@material-ui/icons/SupervisorAccount"));

var _StoreMallDirectory = _interopRequireDefault(require("@material-ui/icons/StoreMallDirectory"));

var _Settings = _interopRequireDefault(require("@material-ui/icons/Settings"));

var _Input = _interopRequireDefault(require("@material-ui/icons/Input"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Description = _interopRequireDefault(require("@material-ui/icons/Description"));

var _Person = _interopRequireDefault(require("@material-ui/icons/Person"));

var _Equalizer = _interopRequireDefault(require("@material-ui/icons/Equalizer"));

var _Settings2 = _interopRequireDefault(require("views/Pages/Settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
// import LoginPage from "views/Pages/LoginPage";
// @material-ui/icons
var routeLayout = {
  auth: "/auth",
  vendor: "/vendor"
};
exports.routeLayout = routeLayout;
var routePaths = {
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
  settings: "/settings"
};
exports.routePaths = routePaths;
var dashRoutes = [{
  path: routePaths.dashboard,
  name: "Dashboard",
  icon: _Dashboard2["default"],
  component: _Dashboard["default"],
  layout: routeLayout.vendor
}, {
  path: routePaths.myWarehouse,
  name: "My Warehouses",
  icon: _StoreMallDirectory["default"],
  component: _MyWarehouse["default"],
  layout: routeLayout.vendor
}, {
  path: routePaths.myWarehouseDetail + "/:id",
  name: "Warehouse Details",
  icon: _StoreMallDirectory["default"],
  component: _WarehouseDetails["default"],
  layout: routeLayout.vendor,
  hidden: true
}, {
  path: routePaths.performance,
  name: "Performance",
  icon: _Equalizer["default"],
  component: _Performances["default"],
  layout: routeLayout.vendor,
  getWarehouse: true
}, {
  path: routePaths.documentation,
  name: "Documentation",
  icon: _Description["default"],
  component: _Documentation["default"],
  layout: routeLayout.vendor,
  getWarehouse: true
}, {
  path: routePaths.notification,
  name: "Notification",
  icon: _Notifications["default"],
  component: _Notification["default"],
  layout: routeLayout.vendor,
  getWarehouse: true
}, {
  path: routePaths.manager,
  name: "Relationship Manager",
  icon: _Person["default"],
  component: _Manager["default"],
  layout: routeLayout.vendor
}, {
  path: routePaths.createWarehouse,
  name: "Create Warehouse",
  icon: _Add["default"],
  component: _CreateWarehouse["default"],
  layout: routeLayout.vendor,
  hidden: true
}, {
  path: routePaths.editWarehouse,
  name: "Edit Warehouse",
  icon: _Add["default"],
  component: _EditWarehouse["default"],
  layout: routeLayout.vendor
}, {
  path: routePaths.editWarehouse + "/:id",
  name: "Edit Warehouse",
  icon: _Input["default"],
  component: _CreateWarehouse["default"],
  layout: routeLayout.vendor,
  hidden: true
}, {
  collapse: false,
  name: "View Warehouse",
  path: routePaths.viewWarehouse + "/:id",
  component: _ViewWarehouse["default"],
  layout: routeLayout.vendor,
  hidden: true
}, {
  collapse: false,
  name: "Edit Profile",
  path: routePaths.editProfile,
  component: _EditProfile["default"],
  layout: routeLayout.vendor,
  hidden: true
}, {
  collapse: false,
  name: "View Profile",
  path: routePaths.viewProfile,
  component: _ViewWarehouse["default"],
  layout: routeLayout.vendor,
  hidden: true
}, // {
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
  icon: _Settings["default"],
  component: _Settings2["default"],
  layout: routeLayout.vendor,
  hidden: true
}];
var _default = dashRoutes;
exports["default"] = _default;