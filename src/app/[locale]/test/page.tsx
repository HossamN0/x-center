import React from "react";
import { AnimatedSection as Csr } from "./_animated-section-csr";
import { AnimatedSection as Ssr } from "./_animated-section-ssr";


const SmoothScrollSection = () => {
    return (
        <>
            <Csr button="Scroll to Next Section" title="About" text="About" />
            <Csr button="Scroll to Next Section" title="About" text="About" />
            <Csr button="Scroll to Next Section" title="About" text="About" />
            <Ssr>
                <h1 className="animated-item text-5xl font-bold mb-4 text-blue-700">
                    About
                </h1>

                <p className="animated-item text-gray-700 max-w-xl text-center mb-8">
                    About
                </p>

                <button
                    className="animated-item bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                >
                    Scroll to Next Section
                </button>
            </Ssr>
            <Ssr>
                <h1 className="animated-item text-5xl font-bold mb-4 text-blue-700">
                    About
                </h1>

                <p className="animated-item text-gray-700 max-w-xl text-center mb-8">
                    About
                </p>

                <button
                    className="animated-item bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                >
                    Scroll to Next Section
                </button>
            </Ssr>
            <Ssr>
                <h1 className="animated-item text-5xl font-bold mb-4 text-blue-700">
                    About
                </h1>

                <p className="animated-item text-gray-700 max-w-xl text-center mb-8">
                    About
                </p>

                <button
                    className="animated-item bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                >
                    Scroll to Next Section
                </button>
            </Ssr>
        </>
    );
};

export default SmoothScrollSection;
