import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
      <div className="max-w-md space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-400/20 blur-[80px] rounded-full -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 drop-shadow-sm select-none">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have vanished or doesn&apos;t exist. Let&apos;s get you back home safely.
          </p>
        </div>

        <div className="pt-2">
          <Link 
            href="/" 
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-600 rounded-full hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1 active:translate-y-0"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
