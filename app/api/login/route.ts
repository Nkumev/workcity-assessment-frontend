import { authEndpoints } from "@/endpoints";
import { cookies } from "next/headers";
const baseUrl = process.env.API_URL as string;
const maxAge = process.env.COOKIE_MAX_AGE as string;
const authCookie = process.env.AUTH_COOKIE_NAME as string;

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  const url = `${baseUrl}${authEndpoints.login}`;

  if (!email || !password) {
    return Response.json(
      {
        message: "Email and password are required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result: LoginResponse = await response.json();

      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `${authCookie}=${result.data.token}; HttpOnly; Path=/; Max-Age=${maxAge}; Secure`
      );

      const { set } = await cookies();

      set(`${authCookie}`, `${result.data.token}`, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: parseInt(maxAge),
      });

      return new Response(JSON.stringify({ ...result }), {
        status: 200,
        headers,
      });
    } else if (response.status === 401) {
      const result = await response.json();
      return Response.json({ ...result }, { status: 401 });
    } else {
      const result = await response.json();
      return Response.json({ ...result }, { status: 500 });
    }
  } catch (e: any) {
    const message = e.message || "An error occurred";
    return Response.json({ message, data: null }, { status: 500 });
  }
}
