import * as base from "api/base";

export class Dashboard {
  myWarehouse: number;
  performance: number;
  documentation: number;
  notification: number;
  approval: number;
  approved_doc: number;
  pending_doc: number;


  constructor(json: any) {
    this.myWarehouse = json.my_warehouse
    this.documentation = json.documentation
    this.performance = json.performance
    this.notification = json.notification
    this.approval = json.in_approval
    this.approved_doc = json.approved_documentation
    this.pending_doc = json.pending_documentation
  }
}

export const getStatistics = async (
  successCallback: (data: Dashboard) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi(`vendor/statistics`);
  if (!response.ok || response.status !== 200) {
    if (response.status === 422) {
      errorCallback();
      return;
    }
  }
  let json = await response.json()
  let data: Dashboard = new Dashboard(json)
  successCallback(data);
}