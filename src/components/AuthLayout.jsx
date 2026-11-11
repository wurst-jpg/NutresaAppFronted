import Logo from './Logo';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-900 via-slate-900 to-indigo-950 px-4 py-8">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-navy-800 p-6 shadow-2xl sm:p-8">
        <div className="mb-6 text-center">
          <Logo className="mx-auto mb-4 justify-center" />
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        {children}
      </div>
    </main>
  );
}
