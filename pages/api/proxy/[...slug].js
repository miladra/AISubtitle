import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
    api: {
      bodyParser: false,
    },
}

export default createProxyMiddleware({
  target: "https://api.groq.com",
  changeOrigin: true,
  pathRewrite: {[`^/api/proxy`]: ''},
});