export const DEVELOPMENT = true
export const BACKEND_PORT = `4000`
export const IP = DEVELOPMENT ?  "reportji.zapto.org": `localhost` 
export const BACKEND_URL = `https://${IP}:${BACKEND_PORT}`
