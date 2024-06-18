import roleConstant from "@/constant/roleConstant"

export default [
  {
    title: "Trang chủ",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
    meta: {
      roles: [roleConstant.user, roleConstant.admin],
    },
  },
  {
    title: "Quản lí trung tâm",
    icon: { icon: "tabler-home" },
    meta: {
      roles: [roleConstant.tenant],
    },
    children: [
      {
        title: "Danh sách trung tâm",
        to: "tenant-my-tenant",
        meta: {
          roles: [roleConstant.tenant],
        },
      },
    ],
  },
  {
    title: "product",
    icon: { icon: "tabler-home" },
    meta: {
      roles: [roleConstant.tenant],
    },
    children: [
      {
        title: "Product Detail",
        to: "product-product-detail",
        meta: {
          roles: [roleConstant.tenant],
        },
      },
    ],
  },
]
