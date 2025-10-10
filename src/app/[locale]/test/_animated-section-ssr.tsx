"use client";

import { useEffect, useRef } from "react";

export function AnimatedSection({
    children
}: {
    children: React.ReactNode;
}) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const items = section.querySelectorAll(".animated-item");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-show");

                        items.forEach((el, index) => {
                            (el as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
                        });
                    } else {
                        entry.target.classList.remove("animate-show");
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Inline CSS for full SSR compatibility */}
            <style jsx>{`
        .animated-section {
          opacity: 0;
          transform: translateY(100px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .animated-section.animate-show {
          opacity: 1;
          transform: translateY(0);
        }

        .animated-item {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-show .animated-item {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

            <section
                ref={sectionRef}
                className="animated-section min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100"
            >
                {children}
                {/* <h1 className="animated-item text-5xl font-bold mb-4 text-blue-700">
                    {title}
                </h1>

                <p className="animated-item text-gray-700 max-w-xl text-center mb-8">
                    {text}
                </p>

                {button && (
                    <button
                        onClick={onclick}
                        className="animated-item bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                    >
                        {button}
                    </button>
                )} */}
            </section>
        </>
    );
}
