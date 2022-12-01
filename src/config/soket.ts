export const DOMAIN = process.env.REACT_APP_DOMAIN_BACKEND

export const urlWebSocket = `ws://${DOMAIN}/ws/notification/`

export let notifSocket = "new WebSocket(urlWebSocket)";
// export let notifSocket = new WebSocket(urlWebSocket);

export const pushNotification = (ws: any, msg: string) => {
  // let ws = new WebSocket(urlWebSocket);
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        message: msg,
      })
    );
  }
}