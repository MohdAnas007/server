
import { FastMCP } from "@prefecthq/fastmcp-ts/server";
import { z } from "zod";
import { getTemperature } from "./utils/weather.js";
//npx fastmcp inspect --file index.js
// npm ci
// npx fastmcp inspect --file index.js
//The inspection command checks the server's tools and metadata. Resolve any errors it reports before deploying.
const server = new FastMCP({
    name: "anas-mcp",
    version: "1.0.0",
});

server.tool(
    {
        name: "get_weather",
        description: "Get weather for a city",
        input: z.object({
            city: z.string().describe("Name of the city"),
        }),
    },
    async ({ city }) => {
        try {
            const temperature = await getTemperature(city);

            return `${temperature} °C`;
        } catch (error) {
            return `Error fetching weather: ${
                error instanceof Error ? error.message : String(error)
            }`;
        }
    }
);



await server.run({
    transport:"sse",
    port:8000
});
