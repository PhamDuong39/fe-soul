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
    title: "Giỏ hàng",
    to: { name: "cart" },
    icon: { icon: "tabler-shopping-cart" },
    meta: {
      roles: [roleConstant.user, roleConstant.admin],
    },
  },
]
