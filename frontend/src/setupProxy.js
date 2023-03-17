const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:4000",
            changeOrigin: true,
        })
    );
    app.use(
        ["/api", "/auth/logout"],
        createProxyMiddleware({
            target: "http://localhost:4000",
            method: "POST",
            changeOrigin: true,
        })
    );
};
