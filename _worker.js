export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The original Vercel deployment keeps ownership of its serverless API.
    // Do not expose those source files from the Cloudflare Pages static copy.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return new Response("Not found", {
        status: 404,
        headers: { "content-type": "text/plain; charset=utf-8" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
