import { useAppDispatch } from "@/hooks";
import { setAuthState } from ".";

export function useAuthActions() {
  const dispatch = useAppDispatch();

  async function login(dto: LoginDto) {
    const req = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await req.json();

    if (req.ok) {
      const res: LoginResponse = response;
      dispatch(
        setAuthState({
          loggedIn: true,
          email: res.data.user.email,
          isAdmin: res.data.user.role === "ADMIN",
        })
      );

      return { success: true, msg: response.message };
    } else {
      return { success: false, msg: response.message };
    }
  }

  async function signup(dto: SignupDto) {
    const req = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await req.json();

    if (req.ok) {
      const res: SignupResponse = response;

      return { success: true, msg: res.message };
    } else {
      return { success: false, msg: response.message };
    }
  }

  async function logout() {
    const req = await fetch("/api/logout", {
      method: "POST",
    });

    const response = await req.json();

    if (req.ok) {
      dispatch(
        setAuthState({
          loggedIn: false,
          email: "",
          isAdmin: false,
        })
      );
      return { success: true, msg: response.message };
    } else {
      return { success: false, msg: response.message };
    }
  }

  return {
    login,
    signup,
    logout,
  };
}
