import * as signalR from "@microsoft/signalr"

var connection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_BACK_END_URL}signalrhub`, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => localStorage.getItem("accessToken"),
  })
  .withAutomaticReconnect()
  .build()

export default {
  async startConnection() {
    try {
      await connection.start()
      console.log("SignalR Connected")
    } catch (err) {
      console.error("SignalR Connection Error: ", err)
    }
  },

  async stopConnection() {
    try {
      await connection.stop()
      console.log("SignalR Disconnected")
    } catch (err) {
      console.error("SignalR Disconnection Error: ", err)
    }
  },

  onReceiveMessage(method, callback) {
    connection.on(method, data => {
      callback(data)
    })
  },

  async sendMessage(method, data) {
    try {
      await connection.invoke(method, data)
    } catch (err) {
      console.error("Error sending message: ", err)
    }
  },
}