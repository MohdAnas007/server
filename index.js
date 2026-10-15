import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getTemperature } from "./utils/weather.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"

const server = new McpServer({
    name: "anas-mcp",
    version: "1.0.0",

})


server.registerTool(
    "get_weather",
    {
        description: "Get weather for a city",
        inputSchema: {
            city: z.string().describe("Name of the city"),
        },
    },
    async ({ city }) => {

        try {
            const res = await getTemperature(city);

            return {
                content: [
                    {
                        type: "text",
                        text: `${res} °C`,
                    },
                ],
            };
        }

        catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: error.message,
                    },
                ],
            };
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);