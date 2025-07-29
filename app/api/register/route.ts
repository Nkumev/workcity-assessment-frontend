import { authEndpoints } from "@/endpoints";
const baseUrl = process.env.API_URL as string;

export async function POST(req: Request) {
  const body = await req.json();

  const url = `${baseUrl}${authEndpoints.signup}`;

  const { adminKey } = body;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body, adminKey: adminKey ?? undefined }),
    });

    if (response.ok) {
      const result: SignupResponse = await response.json();
      return Response.json({ ...result }, { status: 200 });
    } else {
      const result = await response.json();
      const status = response.status || 500;
      return Response.json({ ...result }, { status });
    }
  } catch (e: any) {
    const message = e.message || "An error occurred";
    return Response.json({ message, data: null }, { status: 500 });
  }
}
