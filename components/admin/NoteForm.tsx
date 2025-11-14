import React, { useState, useEffect } from 'react';
import { Note, Category } from '../../types';

interface NoteFormProps {
  onSubmit: (note: Omit<Note, 'id'> | Note) => Promise<void>;
  onCancel: () => void;
  initialData?: Note | null;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.PREPARATION);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategory(initialData.category);
      setImageUrl(initialData.imageUrl || '');
      setVideoUrl(initialData.videoUrl || '');
    } else {
        setTitle('');
        setDescription('');
        setCategory(Category.PREPARATION);
        setImageUrl('');
        setVideoUrl('');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const noteData = {
      title,
      description,
      category,
      imageUrl,
      videoUrl,
    };
    if (initialData) {
        await onSubmit({ ...noteData, id: initialData.id });
    } else {
        await onSubmit(noteData);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {initialData ? 'Chỉnh Sửa Ghi Chú' : 'Tạo Ghi Chú Mới'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Danh mục</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500">
              <option value={Category.PREPARATION}>Chuẩn Bị</option>
              <option value={Category.PROCESS}>Quy Trình</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL Hình ảnh (tùy chọn)</label>
            <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">URL Video YouTube (tùy chọn)</label>
            <input type="url" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/VIDEO_ID" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Hủy
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:bg-gray-400">
              {loading ? 'Đang lưu...' : 'Lưu Ghi Chú'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
