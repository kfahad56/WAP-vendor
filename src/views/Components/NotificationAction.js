import Fingerprint from "@material-ui/icons/Fingerprint";
import StoreIcon from "@material-ui/icons/Store";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";

const dict = {
  warehouse: {
    icon: StoreIcon,
    color: "warning",
  },
  agreement: {
    icon: DescriptionIcon,
    color: "danger",
  },
  personal: {
    icon: PersonIcon,
    color: "success",
  },
};

export const NotificationAction = (data, history, rest) => {
  let temp = { action: null, icon: Fingerprint, color: "danger" };
  switch (data.type) {
    case "anonymous_enquiry":
      break;
    case "anonymous_tour":
      break;
    case "superadmin_approves_tour":
      break;
    case "vendor_edit_warehouse":
      temp.action = () => {
        history.push("/vendor/my-warehouse");
      };
      temp.icon = dict.warehouse.icon;
      temp.color = dict.warehouse.color;
      break;
    case "vendor_create_warehouse":
      temp.action = () => {
        history.push("/vendor/my-warehouse");
      };
      temp.icon = dict.warehouse.icon;
      temp.color = dict.warehouse.color;
      break;
    case "superadmin_recommend_changes":
      temp.action = () => {
        history.push("/vendor/my-warehouse");
      };
      temp.icon = dict.warehouse.icon;
      temp.color = dict.warehouse.color;
      break;
    case "superadmin_halt_approval":
      break;
    case "superadmin_approval_approved":
      temp.action = () => {
        history.push("/vendor/my-warehouse");
      };
      temp.icon = dict.warehouse.icon;
      temp.color = dict.warehouse.color;
      break;
    case "customer_enquiry":
      break;
    case "customer_tour":
      break;
    case "customer_register":
      break;
    case "vendor_register":
      temp.action = () => {
        history.push("/vendor/dashboard");
      };
      temp.icon = dict.personal.icon;
      temp.color = dict.personal.color;
      break;
    case "customer_upload_agreement":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "vendor_upload_agreement":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "superadmin_approves_quotation":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "superadmin_rejects_quotation":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "customer_approves_vendor_document":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "customer_rejects_vendor_document":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    case "blog_verification":
      break;
    case "blog_subscription":
      break;
    case "new_blog_addition":
      break;
    case "superadmin_approves_enquiry":
      break;
    case "vendor_rejects_requirements":
      temp.action = () => {
        history.push(`/vendor/documentation`);
      };
      temp.icon = dict.agreement.icon;
      temp.color = dict.agreement.color;
      break;
    default:
      break;
  }

  return temp;
};
