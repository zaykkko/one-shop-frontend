import {
    createContext,
    useContext,
    useEffect,
    useState,
    useDebugValue,
} from "react";

type AvailableThemes = "light" | "dark";

interface ThemContextType {
    theme: AvailableThemes;
    setTheme(theme: AvailableThemes): void;
}

const ThemeContext = createContext<ThemContextType>({} as ThemContextType);

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeContext");
    }

    return context;
}

function getPreferredTheme() {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }

    return "light";
}

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, setTheme] = useState<AvailableThemes>(
        (localStorage.getItem(
            process.env.THEME_STORAGE_KEY as string
        ) as AvailableThemes) || getPreferredTheme()
    );

    useEffect(() => {
        const rootElement = document.querySelector("html");

        if (theme === "dark") {
            rootElement?.setAttribute("dark", "true");
        } else {
            rootElement?.removeAttribute("dark");
        }

        localStorage.setItem(process.env.THEME_STORAGE_KEY as string, theme);

        return () => {
            rootElement?.removeAttribute("dark");
        };
    }, [theme]);

    useEffect(() => {
        function onThemeChange(event: MediaQueryListEvent) {
            const newColorScheme = event.matches ? "dark" : "light";

            setTheme(newColorScheme);
        }

        if (window.matchMedia) {
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .addEventListener("change", onThemeChange);
        }

        return () => {
            if (window.matchMedia) {
                window
                    .matchMedia("(prefers-color-scheme: dark)")
                    .removeEventListener("change", onThemeChange);
            }
        };
    }, []);

    useDebugValue(theme);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
