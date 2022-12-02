export const DOMAIN_BACKEND = process.env.REACT_APP_DOMAIN_BACKEND


const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
export const urlWebSocketNotification = `${wsProtocol}${DOMAIN_BACKEND}/ws/notification/`

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