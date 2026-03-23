import { createContext, useContext, useState, type ReactElement } from 'react';

export interface AuthState {
	isAuthenticated: boolean;
	authenticate: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactElement }) {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('token') === '123',
	);

	const authenticate = () => {
		setIsAuthenticated(true);
		localStorage.setItem('token', '123');
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('hook not used within auth provider');
	}

	return context;
}
