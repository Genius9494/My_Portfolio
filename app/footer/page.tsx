"use client";

export default function Footer(): JSX.Element {
    return (
        <footer className="py-8 mt-12 border-t bg-black border-white/10 z-50">
            <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-400">
             Our team — All rights reserved   © {new Date().getFullYear()}
            </div>
        </footer>
    );
}
