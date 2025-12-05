import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  const loadPosts = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchPosts(filters);
      setPosts(data);
    } catch (err) {
      setError('Ntibyashobotse gupakira inyandiko.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onSearch = (event) => {
    event.preventDefault();
    loadPosts({ search, tag });
  };

  const tags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.tags || [])
        .filter(Boolean)
        .map((value) => value.trim())
    )
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Blog CMS</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Soma. Andika. Sangiza ibitekerezo.</h1>
        <p className="mt-2 text-slate-500">
          Ushobora gushakisha inyandiko ukoresheje umutwe cyangwa ukazihitamo hakurikijwe tags.
        </p>
      </div>

      <form onSubmit={onSearch} className="mb-8 grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Shakisha inkuru..."
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
        />
        <button type="submit" className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">
          Shakisha
        </button>
      </form>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              setTag('');
              loadPosts({ search });
            }}
            className={`rounded-full border px-4 py-2 ${tag === '' ? 'border-primary text-primary' : 'border-slate-200 text-slate-500'}`}
          >
            Zose
          </button>
          {tags.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                setTag(item);
                loadPosts({ search, tag: item });
              }}
              className={`rounded-full border px-4 py-2 ${tag === item ? 'border-primary text-primary' : 'border-slate-200 text-slate-500'}`}
            >
              #{item}
            </button>
          ))}
        </div>
      )}

      {error && <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {loading ? (
        <p className="text-center text-sm text-slate-500">Ipakira...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-slate-500">Nta nyandiko zirabonwa.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
