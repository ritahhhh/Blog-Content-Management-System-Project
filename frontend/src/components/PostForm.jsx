import { useState } from 'react';

const PostForm = ({ initialData = {}, onSubmit, submitting, submitLabel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [tags, setTags] = useState(initialData.tags?.join(', ') || '');
  const [status, setStatus] = useState(initialData.status || 'draft');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Uzuza umutwe n\'inyandiko nyamukuru.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('status', status);
    if (file) {
      formData.append('featuredImage', file);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-slate-700">Umutwe</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
          placeholder="Andika umutwe w\'inkuru"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Inyandiko</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
          placeholder="Andika inkuru yawe hano"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Tags (ukoreshe igitabo ,)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
          placeholder="tech, life, travel"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Imiterere</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Ifoto y'igika</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-center font-semibold text-white disabled:opacity-60"
      >
        {submitting ? 'Bikorwa...' : submitLabel}
      </button>
    </form>
  );
};

export default PostForm;
