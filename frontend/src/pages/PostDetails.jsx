import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../services/postService';

const apiBase =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.replace(/\/api$/, '')) ||
  'http://localhost:5000';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await fetchPost(id);
        setPost(data);
      } catch (err) {
        setError('Iyi nyandiko ntibashije kuboneka.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-center text-sm text-slate-500">Ipakira...</p>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-sm font-semibold text-primary"
        >
          Garuka ku rutonde
        </button>
      </div>
    );
  }

  if (!post) return null;

  const cover = post.featuredImage ? `${apiBase}${post.featuredImage}` : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {new Date(post.createdAt).toLocaleDateString()} · {post.status}
      </p>
      <h1 className="mt-4 text-4xl font-bold text-slate-900">{post.title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        Byanditswe na {post.author?.name} ({post.author?.role})
      </p>
      {cover && (
        <img src={cover} alt={post.title} className="mt-6 rounded-2xl" />
      )}
      <div className="mt-6 space-y-4 whitespace-pre-wrap leading-relaxed text-slate-700">
        {post.content}
      </div>
      <div className="mt-8 flex flex-wrap gap-3 text-xs">
        {post.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-4 py-1 text-slate-600">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default PostDetails;
