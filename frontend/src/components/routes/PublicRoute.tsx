// src/components/routes/PublicRoute.tsx
import { Navigate } from "react-router";

interface PublicRouteProps {
    children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
