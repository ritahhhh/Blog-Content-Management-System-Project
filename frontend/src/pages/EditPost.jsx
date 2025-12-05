import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { fetchPost, updatePost } from '../services/postService';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await fetchPost(id);
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Ntibyashobotse gupakira inyandiko.');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    try {
      await updatePost(id, formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Guhindura byanze.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-10 text-center text-sm text-slate-500">Ipakira...</p>;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-slate-500">Iyi nyandiko ntiyabonetse.</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Hindura: {post.title}</h1>
      <p className="mt-2 text-sm text-slate-500">Vugurura ibisobanuro birambuye by'iyi nyandiko.</p>

      {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
        <PostForm
          initialData={post}
          submitLabel="Bika impinduka"
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default EditPost;
