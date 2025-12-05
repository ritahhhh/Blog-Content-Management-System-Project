import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
    <h1 className="mt-3 text-3xl font-bold text-slate-900">Ukoresheje url itariyo</h1>
    <p className="mt-2 text-slate-500">Inzira wemeje ntibonetse. Garuka ku rubuga rw'ibanze cyangwa reba dashboard yawe.</p>
    <div className="mt-6 flex gap-3">
      <Link to="/" className="rounded-xl border border-primary px-5 py-2 text-primary">
        Garuka ku rubuga
      </Link>
      <Link to="/dashboard" className="rounded-xl bg-primary px-5 py-2 text-white">
        Jya kuri Dashboard
      </Link>
    </div>
  </section>
);

export default NotFound;
