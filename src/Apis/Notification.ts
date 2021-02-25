import * as base from "./base";

export class Notification {
  title: string = ""
  body: string = ""
  timeAgo: string = ""
  type: string = ""
  status: string = ""

  getTimeAgo = (date: any) => {
    const now: any = new Date()
    const diff: number = now - date;

    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    let timeType = 'seconds'
    let timeAgo = 0
    // milliseconds
    if (diff >= 1000) {
      timeType = 'seconds'
      timeAgo = Math.floor(diff / 1000)
      // minutes
      if (timeAgo >= 60) {
        timeType = 'minutes'
        timeAgo = Math.floor(timeAgo / 60)
        // hours
        if (timeAgo >= 60) {
          timeType = 'hours'
          timeAgo = Math.floor(timeAgo / 60)
          // days
          if (timeAgo >= 24) {
            timeType = 'days'
            timeAgo = Math.floor(timeAgo / 24)
            // week
            if (timeAgo >= 7) {
              timeType = 'weeks'
              timeAgo = Math.floor(timeAgo / 7)
              // month
              if (timeAgo >= 4.345) {
                timeType = 'months'
                timeAgo = Math.floor(timeAgo / 4.345)
              }
            }
          }
        }
      }
    }

    return `${timeAgo} ${timeType} ago`
  }

  constructor(json: any) {
    if (json) {
      this.title = json.title
      this.body = json.body
      this.type = json.type
      this.status = json.status
      this.timeAgo = this.getTimeAgo(new Date(json.created_at))
    }
  }
}

export const getWarehouses = async (
  id: number,
  setData: (notifications: Notification[]) => void,
  setPageData: (pageData: base.pageData) => void,
  errorCallback: () => void,
) => {
  let params = ''
  if (id) {
    params = '?warehouse_id=' + id
  }
  const response = await base.getApi(`customer/notification${params}`)
  if (response.ok === false || response.status !== 200) {
    errorCallback();
    return;
  }

  let json = await response.json();
  let notifications = json.data.map((item: any) => {
    return new Notification(item);
  });
  setPageData({
    totalData: json.total_data,
    perPage: json.per_page,
    currentPage: json.current_page,
  })
  setData(notifications);
}