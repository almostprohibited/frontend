import { createContext, useContext, useState, type ReactElement } from 'react';
import { useCookies } from 'react-cookie';

const COOKIE_NAME = 'token';

interface CookieValue {
	token?: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactElement }) {
	const [cookies, _, removeCookie] = useCookies<
		typeof COOKIE_NAME,
		CookieValue
	>([COOKIE_NAME]);

	console.log(cookies);

	const [isAuthenticated, setIsAuthenticated] = useState(
		cookies.token !== undefined,
	);

	const logout = () => {
		setIsAuthenticated(false);
		removeCookie(COOKIE_NAME);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, logout }}>
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
