import { cn } from "@/services/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDestructive } from "../Alert/AlertDestructive";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAuthError } from "@/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState(null);
  const backendError = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginWithGoogle, login, isAuthenticated } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const backendPort = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/photos");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [backendError]);

  const clearLocalError = () => {
    setTimeout(() => {
      setLocalError(null);
    }, 2000);
  };

  const handleLogin = () => {
    if (!email) {
      setLocalError("Enter a email!");
      clearLocalError();
      return;
    }
    login({ email });
    setEmail("");
    navigate("/photos");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your picsmate. account
                </p>
              </div>
              {(localError || backendError) && (
                <AlertDestructive message={localError || backendError} />
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-red-600 text-white dark:bg-red-600"
                onClick={handleLogin}
              >
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={loginWithGoogle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=http://localhost:${backendPort}/auth/google/callback&response_type=code&scope=openid email profile&access_type=offline&prompt=select_account`}
                  className="underline underline-offset-4"
                >
                  Sign up with Google
                </Link>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://i.pinimg.com/736x/55/51/44/555144d07ae06ae14e9218783711ce4f.jpg"
              alt="camera"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
