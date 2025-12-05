import { Link } from 'react-router-dom';

const apiBase =
  (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.replace(/\/api$/, '')) ||
  'http://localhost:5000';

const PostCard = ({ post }) => {
  const cover = post.featuredImage ? `${apiBase}${post.featuredImage}` : null;

  return (
    <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {cover && (
        <img
          src={cover}
          alt={post.title}
          className="h-48 w-full rounded-t-xl object-cover"
        />
      )}
      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="text-sm text-slate-600">
          {post.excerpt || post.content.substring(0, 160)}...
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          {post.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              #{tag}
            </span>
          ))}
        </div>
        <Link
          to={`/posts/${post._id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          Soma ibindi →
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
