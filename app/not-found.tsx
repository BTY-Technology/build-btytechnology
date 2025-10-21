import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bty-dark flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-9xl font-bold text-gradient">404</h1>
        <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Go Home
        </Link>
      </div>
    </div>
  );
}
