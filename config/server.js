module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "4da1c8111bd0be5dd1358cb9b1a91f93"),
    },
    serveAdminPanel: env.bool("SERVE_ADMIN_PANEL", true),
  },
});
