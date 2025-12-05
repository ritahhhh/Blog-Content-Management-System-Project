import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchPosts, removePost } from '../services/postService';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingPost, setDeletingPost] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError('Ntibyashobotse gupakira dashboard.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return posts;
    return posts.filter((post) => post.author?._id === user.id);
  }, [posts, user]);

  const confirmDelete = async () => {
    if (!deletingPost) return;
    try {
      await removePost(deletingPost._id);
      setDeletingPost(null);
      loadPosts();
    } catch (err) {
      console.error(err);
      setError('Gusiba byanze, gerageza kongera.');
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-400">Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900">Genzura inyandiko zawe</h1>
        </div>
        <Link to="/dashboard/create" className="rounded-xl bg-primary px-6 py-3 text-white">
          + Andika inyandiko nshya
        </Link>
      </div>

      {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="mt-10 text-center text-sm text-slate-500">Ipakira...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="mt-10 text-center text-slate-500">Nta nyandiko zihari kuri konti yawe.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-slate-500">
                  Inyandiko
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-slate-500">
                  Tags
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider text-slate-500">
                  Igihe
                </th>
                <th className="px-6 py-3 text-right font-semibold uppercase tracking-wider text-slate-500">
                  Ibikorwa
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{post.title}</p>
                    <p className="text-xs text-slate-500">{post.author?.name}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {post.tags?.length ? post.tags.join(', ') : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        post.status === 'published'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 text-xs font-semibold">
                      <Link to={`/posts/${post._id}`} className="text-slate-500">
                        Reba
                      </Link>
                      <Link to={`/dashboard/edit/${post._id}`} className="text-primary">
                        Hindura
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeletingPost(post)}
                        className="text-red-500"
                      >
                        Siba
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmModal
        open={Boolean(deletingPost)}
        title="Uremeza gusiba?"
        description={`Ugiye gusiba inyandiko "${deletingPost?.title ?? ''}". Ibi ntibisubirwamo.`}
        confirmLabel="Yemeza"
        cancelLabel="Kureka"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingPost(null)}
      />
    </section>
  );
};

export default Dashboard;
