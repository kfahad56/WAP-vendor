import * as base from "api/base";

export class Statistics {
  warhouseNo: number = 0;

  constructor(json: any) {
    if (json) {
      this.warhouseNo = json.warehouse;
    }
  }

  setProperties(json: any): void {
    this.warhouseNo = json.warehouseNo
  }
}

export const getStatistics = async (
  setStatisticsData: (StatsData: Statistics) => void,
  setPageData: (ManagerPageData: base.pageData) => void,
  errorCallback: () => void
) => {
  const response = await base.getApi("vendor/statistics")
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }
  let json = await response.json();
  setStatisticsData(new Statistics(json));
}
