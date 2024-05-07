import { notification } from "ant-design-vue"
import {
  IconMoodSmileFilled,
  IconMoodSadFilled,
  IconAlertTriangleFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-vue"
import typeNotification from "@/constant/typeNotification"
import { CloseOutlined } from "@ant-design/icons-vue"

notification.config({
  placement: "topRight",
  duration: 3,
  rtl: false,
  closeIcon: () =>
    h(CloseOutlined, {
      style:
        "color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))",
    }),
})

const showNotification = (type, message, description) => {
  let icon = IconMoodSmileFilled
  let color = "green"
  switch (type) {
  case typeNotification.error:
    icon = IconMoodSadFilled
    color = "red"
    break
  case typeNotification.warning:
    icon = IconAlertTriangleFilled
    color = "yellow"
    break
  case typeNotification.info:
    icon = IconInfoCircleFilled
    color = "blue"
    break
  default:
    icon = IconMoodSmileFilled
    color = "green"
    break
  }

  notification[type]({
    message,
    description,
    style: {
      backgroundColor: "var(--v-theme-background)",
      borderRight: `7px solid ${color}`,
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",

    },
    icon: () =>
      h(icon, {
        style:
          "color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity))",
      }),
  })
}

export default {
  install: app => {
    app.provide("$notification", showNotification)
  },
}
export const $notification = showNotification
