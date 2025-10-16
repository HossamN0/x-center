import { cn } from "@/lib/utils/utils";

export function TypographyH1({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-center md:text-4xl text-2xl font-extrabold tracking-tight text-balance",
                className
            )}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h2
            className={cn(
                "scroll-m-20 pb-2 md:text-3xl text-xl font-semibold tracking-tight first:mt-0",
                className
            )}
        >
            {children}
        </h2>
    );
}

export function TypographyH3({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3
            className={cn("scroll-m-20 md:text-2xl text-[1.15rem] font-semibold tracking-tight", className)}
        >
            {children}
        </h3>
    );
}

export function TypographyH4({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h4
            className={cn("scroll-m-20 md:text-xl text-[1rem] font-semibold tracking-tight", className)}
        >
            {children}
        </h4>
    );
}

export function TypographyP({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6 break-words whitespace-pre-line break-all", className)}>
            {children}
        </p>
    );
}

export function TypographyBlockquote({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <blockquote
            className={cn("mt-6 border-l-2 pl-6 italic", className)}
        >
            {children}
        </blockquote>
    );
}
