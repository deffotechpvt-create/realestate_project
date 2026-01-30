"use client";

import { createContext, useEffect, useState } from "react";
import api from "@/lib/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // -----------------------
    // FETCH CURRENT SESSION
    // -----------------------
    const fetchMe = async () => {
        try {
            const res = await api.get("/users/me");
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // -----------------------
    // LOGIN FUNCTION
    // -----------------------
    const login = async (email: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            setUser(res.data.user);
            console.log(user);
            return { success: true };
        } catch (err: any) {
            return {
                success: false,
                message: err.response?.data?.message || "Login failed"
            };
        }
    };

    // -----------------------
    // LOGOUT FUNCTION
    // -----------------------
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (err) {
            console.log("Logout error");
        } finally {
            setUser(null);
            window.location.href = "/login";
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
