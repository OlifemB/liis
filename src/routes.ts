import Main from "@/interface/pages/main";
import Login from "@/interface/pages/login";
import Error from "@/interface/pages/error";


export const authRoutes = [{
    path: '/',
    Element: Main
}]

export const publicRoutes = [{
    path: '/login',
    Element: Login
}, {
    path: '/error',
    Element: Error
}]