
function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[url('/assets/images/bg-auth.webp')] bg-cover bg-center relative z-[1]">
            <section className="container min-h-screen flex flex-col justify-center items-center">
                <div className="absolute top-0 left-0 w-full h-full bg-primary-foreground/60 -z-[1]"></div>
                <div className="content-container">
                    <div className="bg-black/50 w-full lg:w-1/2 mx-auto p-8 rounded-md text-white">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AuthLayout
