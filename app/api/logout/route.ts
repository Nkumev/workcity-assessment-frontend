import { cookies } from "next/headers";

const authCookie = process.env.AUTH_COOKIE_NAME as string;

export async function POST(req: Request) {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `${authCookie}=; HttpOnly; Path=/; Max-Age=0; Secure`
  );

  const { set } = await cookies();

  set(`${authCookie}`, "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
  });

  return new Response(
    JSON.stringify({ message: "Logged out successfully", data: null }),
    {
      status: 200,
      headers,
    }
  );
}
