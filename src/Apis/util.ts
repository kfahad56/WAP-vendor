import * as fingerprintApi from "../Apis/fingerprint"


export const getDate = (d: Date): string => {
  return d.toISOString().replace('T', ' ').replace('Z', '')
}

export const getDatetime = (date: Date, time: string) => {
  let d = date.toISOString().split('T')
  d[1] = time
  return d.join(' ')
}

export const toDate = (d: string): Date => {
  return new Date(d)
}

export const formatDate = (date: Date) => {
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export const msToTime = (date: any) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

// console.log(msToTime(new Date));


export default function fp() {

  let obj = new fingerprintApi.FingerPrint({
    fingerprint: "342",
    device: "342",
    campaign_source: "234",
    campaign_medium: "324",
    campaign_name: "fds"
  })
  console.log(obj)
  fingerprintApi.createFingerPrint(obj, () => { console.log('success') }, (e) => { console.log(e) })

}