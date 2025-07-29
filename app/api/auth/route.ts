import { getAuth } from "../utils";

export async function GET(req: Request) {
  const token = getAuth(req);
  return Response.json({ message: "Token retrieved", token });
}
