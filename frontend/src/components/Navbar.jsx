import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold text-primary">
          Blog CMS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-primary ${isActive ? 'text-primary' : ''}`
            }
          >
            Ahabanza
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `hover:text-primary ${isActive ? 'text-primary' : ''}`
              }
            >
              Dashboard
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-slate-600 sm:inline">
                {user.name} · {user.role}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                Gusohoka
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-primary px-4 py-2 text-primary"
              >
                Kwinjira
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-primary px-4 py-2 text-white"
              >
                Kwiyandikisha
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
