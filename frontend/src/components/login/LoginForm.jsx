import { cn } from "@/services/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDestructive } from "../Alert/AlertDestructive";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError } from "@/features/auth/authSlice";

export function LoginForm({ className, ...props }) {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const backendError = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/photos");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-2xl border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left Side */}
          <div className="p-8 md:p-10 flex flex-col gap-8 justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold mb-2">
                Welcome to picsmate.
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in with Google to continue
              </p>
            </div>

            {backendError && <AlertDestructive message={backendError} />}

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-100"
              onClick={loginWithGoogle}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span className="text-md font-semibold text-gray-800">
                Sign in with Google
              </span>
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>

          {/* Right Side Image */}
          <div className="relative hidden md:block">
            <img
              src="https://i.pinimg.com/736x/55/51/44/555144d07ae06ae14e9218783711ce4f.jpg"
              alt="camera"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
