export const DEVELOPMENT = false
export const BACKEND_PORT = `4000`
export const IP = DEVELOPMENT ?  "reportji.zapto.org": `localhost` 
export const BACKEND_URL = `http://${IP}:${BACKEND_PORT}`
