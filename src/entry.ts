import { createMiddleware } from "@hattip/adapter-node";
import { createRouter } from "@hattip/router";
import { SimpleCookieStore, session } from "@hattip/session";

import express from "express";

const router = createRouter();

router.use(
  session({
    // Session store
    store: new SimpleCookieStore(),
    // Default session data when a new session is created.
    // It can be a function.
    // It is shallow cloned, if you need a deep clone, use a function.
    defaultSessionData: {},
  })
);

router.get("/", () => {
  return new Response('Go to <a href="/about">Home</a>', {
    headers: { "Content-Type": "text/html" },
  });
});

router.get("/home", () => {
  return new Response('Go to <a href="/about">About</a>', {
    headers: { "Content-Type": "text/html" },
  });
});

router.get(
  "/about",
  () =>
    new Response("<p>About page</p>", {
      headers: { "Content-Type": "text/html" },
    })
);

const hattip = createMiddleware(router.buildHandler());

const app = express();

app.use(hattip);

app.listen(3000, "localhost", () => {
  console.log("Server listening on http://localhost:3000");
});
