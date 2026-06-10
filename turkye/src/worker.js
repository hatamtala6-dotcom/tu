import { handleTelegramUpdate } from "./telegram/telegram.js";

export default {
  async fetch(request, env, ctx) {
    try {
      if (request.method === "POST") {
        const update = await request.json();

        console.log(
          "UPDATE:",
          JSON.stringify(update)
        );

        await handleTelegramUpdate(
          update,
          env
        );

        return new Response("OK");
      }

      return new Response(
        JSON.stringify({
          status: "running",
          bot: "Turkey Worker Bot Pro"
        }),
        {
          headers: {
            "content-type":
              "application/json"
          }
        }
      );
    } catch (err) {
      console.error(
        "WORKER ERROR:",
        err
      );

      return new Response(
        JSON.stringify({
          error: err.message
        }),
        {
          status: 500
        }
      );
    }
  }
};
