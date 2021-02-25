import * as base from "./base";

export class Statistics {
  rented_warehouse: number = 0;

  constructor(json: any) {
    if (json) {
      this.rented_warehouse = json.rented_warehouse;
    }
  }

  setProperties(json: any): void {
    this.rented_warehouse = json.rented_warehouse
  }
}

export const getStatistics = async (
  setStatisticsData: (StatsData: Statistics) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("customer/statistics")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  setStatisticsData(new Statistics(json));
}
