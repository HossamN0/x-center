import { routing } from './i18n/routing';
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Pages, Roles, Routes } from "./constants/enum";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
    async function middleware(req: NextRequest) {

        const intlResponse = intlMiddleware(req);

        const pathname = req.nextUrl.pathname;
        const locale = req.nextUrl.pathname.split("/")[1];
        const supportedLocales = ["en", "ar"];

        const normalizedPathname = supportedLocales.includes(locale)
            ? pathname.replace(`/${locale}`, "")
            : pathname;

        const isAuth = await getToken({ req });
        const role = isAuth?.role

        const instructorRoutes = [Routes.INSTRUCTOR]
        const isInstructorRoute = instructorRoutes.some((route) => normalizedPathname.startsWith(`/${route}`));

        const studentRoutes = [Routes.STUDENT]
        const isStudentRoute = studentRoutes.some((route) => normalizedPathname.startsWith(`/${route}`));

        const isAuthRoute = normalizedPathname.startsWith(`/${Routes.AUTH}`);

        if (isAuth && isAuthRoute) {
            return NextResponse.redirect(
                new URL(`/${Routes.HOME}`, req.url)
            )
        }

        if (role !== Roles.INSTRUCTOR && isInstructorRoute) {
            if (role === Roles.STUDENT) {
                return NextResponse.redirect(
                    new URL(`/${Routes.STUDENT}/${Pages.DASHBOARD}`, req.url)
                )
            } else {
                return NextResponse.redirect(
                    new URL(`/${Routes.HOME}`, req.url)
                )
            }
        }

        if (role !== Roles.STUDENT && isStudentRoute) {
            if (role === Roles.INSTRUCTOR) {
                return NextResponse.redirect(
                    new URL(`/${Routes.INSTRUCTOR}/${Pages.DASHBOARD}`, req.url)
                )
            } else {
                return NextResponse.redirect(
                    new URL(`/${Routes.HOME}`, req.url)
                )
            }
        }
        return intlResponse;
    }, {
    callbacks: {
        async authorized() {
            return true;
        }
    }
})

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};