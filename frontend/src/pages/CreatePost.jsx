import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { createPost } from '../services/postService';

const CreatePost = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    try {
      await createPost(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Guhanga inyandiko byanze.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Andika inyandiko nshya</h1>
      <p className="mt-2 text-sm text-slate-500">
        Uzuza amakuru akenewe hanyuma ushyire biheruka.
      </p>

      {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
        <PostForm submitLabel="Bika inyandiko" submitting={submitting} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default CreatePost;
