// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-[#0B0F11] py-6 text-center text-sm text-gray-400">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Xyvo AI</span> — From&nbsp;
          <a
            href="https://xyvo.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-blue-400"
          >
            xyvo.ca
          </a>
        </p>
      </div>
    </footer>
  );
}
