import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = mode === "signin"
      ? await signIn(email, password)
      : await signUp(email, password);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (mode === "signup") toast.success("Account created. Signing in…");
    // The auth listener will pick up the session and redirect via useEffect
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-[#183852] to-[#0d2236] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-[#01B9EA]/10 grid place-items-center">
            <Lock className="w-5 h-5 text-[#01B9EA]" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#01B9EA]">Admin</div>
            <div className="text-lg font-semibold text-[#183852]">Sign in to CMS</div>
          </div>
        </div>
        <p className="text-sm text-secondary/60 mt-3 mb-6">
          {mode === "signin"
            ? "Use your admin email to manage site content."
            : "Create your admin account."}
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" className="w-full bg-[#183852] hover:bg-[#0f2738]" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 text-sm text-secondary/60 hover:text-primary block mx-auto"
        >
          {mode === "signin" ? "First time? Create account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
