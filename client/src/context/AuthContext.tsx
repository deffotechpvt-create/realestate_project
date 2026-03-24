"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// ==========================================
// TYPES
// ==========================================
interface User {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "agent" | "user";
    status: "active" | "pending_verification" | "banned";
    phone?: string;
    subscription?: {
        plan: "free" | "basic" | "premium";
        expiryDate?: Date;
        contactsUnlocked: number;
    };
}

interface AuthResponse {
    success: boolean;
    message?: string;
    user?: User;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (data: RegisterData) => Promise<AuthResponse>;
    logout: () => Promise<void>;
    refetchUser: () => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
    clearError: () => void;

    // Role helpers
    isAdmin: () => boolean;
    isAgent: () => boolean;
    isVerifiedAgent: () => boolean;
    isActive: () => boolean;
    isPending: () => boolean;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    accountType: "user" | "agent";
}

// ==========================================
// CREATE CONTEXT
// ==========================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==========================================
// AUTH PROVIDER
// ==========================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ==========================================
    // FETCH CURRENT USER
    // ==========================================
    const fetchMe = async () => {
        try {
            const res = await api.get("/user/profile");

            if (res.data.success) {
                setUser(res.data.user);
                setError(null);
            } else {
                setUser(null);
            }
        } catch (err: any) {
            setUser(null);
            // Don't set error on 401 (user not logged in)
            if (err.response?.status !== 401) {
                console.error("Fetch user error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOGIN
    // ==========================================
    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            setError(null);

            const res = await api.post("/auth/login", { email, password });

            if (res.data.success) {
                setUser(res.data.user);

                // Show message for pending users
                if (res.data.message) {
                    return {
                        success: true,
                        message: res.data.message,
                        user: res.data.user
                    };
                }

                return { success: true, user: res.data.user };
            }

            return { success: false, message: "Login failed" };

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);

            return {
                success: false,
                message: errorMessage
            };
        }
    };

    // ==========================================
    // REGISTER
    // ==========================================
    const register = async (data: RegisterData): Promise<AuthResponse> => {
        try {
            setError(null);

            const res = await api.post("/auth/register", data);

            if (res.data.success) {
                return {
                    success: true,
                    message: res.data.message || "Registration successful. Please login."
                };
            }

            return { success: false, message: "Registration failed" };

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setError(errorMessage);

            return {
                success: false,
                message: errorMessage
            };
        }
    };

    // ==========================================
    // LOGOUT
    // ==========================================
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            setUser(null);
            setError(null);
            router.push("/login");
        }
    };

    // ==========================================
    // REFETCH USER
    // ==========================================
    const refetchUser = async () => {
        setLoading(true);
        await fetchMe();
    };

    // ==========================================
    // UPDATE USER (Local State)
    // ==========================================
    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };

    // ==========================================
    // CLEAR ERROR
    // ==========================================
    const clearError = () => {
        setError(null);
    };

    // ==========================================
    // ROLE HELPERS
    // ==========================================
    const isAdmin = (): boolean => {
        return user?.role === "admin";
    };

    const isAgent = (): boolean => {
        return user?.role === "agent";
    };

    const isVerifiedAgent = (): boolean => {
        return user?.role === "agent" && user?.status === "active";
    };

    const isActive = (): boolean => {
        return user?.status === "active";
    };

    const isPending = (): boolean => {
        return user?.status === "pending_verification";
    };

    // ==========================================
    // INITIAL FETCH
    // ==========================================
    useEffect(() => {
        fetchMe();
    }, []);

    // ==========================================
    // CONTEXT VALUE
    // ==========================================
    const value: AuthContextType = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        refetchUser,
        updateUser,
        clearError,
        isAdmin,
        isAgent,
        isVerifiedAgent,
        isActive,
        isPending
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// ==========================================
// CUSTOM HOOK
// ==========================================
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

// ==========================================
// EXPORT CONTEXT (for direct access if needed)
// ==========================================
export { AuthContext };
