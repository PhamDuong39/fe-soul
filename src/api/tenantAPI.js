import axiosIns from "@/plugins/axios"

const controlerName = "tenant"

export async function getData(options) {
  const res = await axiosIns.post(`${controlerName}/getdata`, options)

  return res.data
}

export async function addData(tenant) {
  const res = await axiosIns.post(`${controlerName}/adddata`, tenant)

  return res.data
}

export async function updateData(tenant) {
  const res = await axiosIns.post(`${controlerName}/updatedata`, tenant)

  return res.data
}

export async function deleteData(id) {
  const res = await axiosIns.get(`${controlerName}/deletedata`, {
    params: { id },
  })

  return res.data
}
