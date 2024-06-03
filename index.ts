const data = {
    mentee1: {
        "name": "Mentee1",
        "program": "Hybrid Cloud & Redhat"
    },
    mentee2: {
        "name": "Mentee2",
        "program": "Hybrid Cloud & Redhat"
    },
    mentee3: {
        "name": "Mentee3",
        "program": "Web & Mobile Development"
    },
    mentee4: {
        "name": "Mentee4",
        "program": "IBM Cybersecurity"
    },
    mentee5: {
        "name": "Mentee5",
        "program": "UI/UX & Web Development"
    }
};

const server = Bun.serve({
    async fetch (req) {
        const path = new URL(req.url).pathname;

        // respond with text/html
        if (path === "/") return new Response("Welcome to IL!");

        // respond with JSON
        if (path === "/api") return Response.json({ some: "buns", for: "you" });

        // receive JSON data to a POST request
        if (req.method === "POST" && path === "/api/post") {
            const data = await req.json();
            console.log("Received JSON:", data);
            return Response.json({ success: true, data });
        }

        // receive POST data from a form
        if (req.method === "POST" && path === "/form") {
            const data = await req.formData();
            console.log(data.get("someField"));
            return new Response("Success");
        }

        // Beautify JSON and respond
        if (path === "/mentee") {
            const beautifiedJson = JSON.stringify(data, null, 2);
            return new Response(beautifiedJson, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        // 404s
        return new Response("Page not found", { status: 404 });
    }
});

console.log(`Listening on ${server.url}`);
