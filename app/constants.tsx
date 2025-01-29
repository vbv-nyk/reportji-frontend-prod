// DEvelopment set to true if your backend is running on localhost
export const DEVELOPMENT = false;
export const BACKEND_PORT = `${!DEVELOPMENT ? 5000 : 4000}`;
export const IP = !DEVELOPMENT ? "reportease.ddns.net" : `localhost`;
export const BACKEND_URL = `${
  !DEVELOPMENT ? "https" : "http"
}://${IP}:${BACKEND_PORT}`;
