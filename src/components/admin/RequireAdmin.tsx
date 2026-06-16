import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-secondary/60 text-sm">Loading…</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen grid place-items-center bg-background p-8 text-center">
        <div>
          <h1 className="display-serif text-3xl text-secondary mb-3">Access denied</h1>
          <p className="text-secondary/60 mb-6">Your account does not have admin access.</p>
          <a href="/" className="text-primary underline">Back to site</a>
        </div>
      </div>
    );
  return <>{children}</>;
};

export default RequireAdmin;
