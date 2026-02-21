import { createContext, useContext, useState } from 'react';
import { ROLE_ROUTES, ROLES } from '../constants/roles';

const AuthContext = createContext(null);

const STORAGE_KEY = 'gmrit-auth';

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.email && parsed.role) {
                    return { email: parsed.email, role: parsed.role, isAuthenticated: true };
                }
            }
        } catch {
            // ignore corrupt data
        }
        return { email: null, role: null, isAuthenticated: false };
    });

    const login = (email, role) => {
        const newAuth = { email, role, isAuthenticated: true };
        setAuth(newAuth);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, role }));
    };

    const logout = () => {
        setAuth({ email: null, role: null, isAuthenticated: false });
        localStorage.removeItem(STORAGE_KEY);
    };

    /** Returns the correct dashboard path for the current user's role */
    const getRoleRedirect = (role) => {
        return ROLE_ROUTES[role] || '/';
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, getRoleRedirect }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
