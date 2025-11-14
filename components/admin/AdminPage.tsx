import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore.js';
import { Note } from '../../types';
import { NoteForm } from './NoteForm';

export const AdminPage: React.FC = () => {
  const { logout, user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const notesCollection = collection(db, 'notes');
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
      setNotes(notesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddNote = async (noteData: Omit<Note, 'id'>) => {
    try {
      await addDoc(collection(db, 'notes'), noteData);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Đã xảy ra lỗi khi thêm ghi chú.");
    }
  };

  const handleUpdateNote = async (noteData: Note) => {
    try {
      const noteRef = doc(db, 'notes', noteData.id);
      await updateDoc(noteRef, noteData);
      setIsFormOpen(false);
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Đã xảy ra lỗi khi cập nhật ghi chú.");
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      try {
        await deleteDoc(doc(db, 'notes', id));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Đã xảy ra lỗi khi xóa ghi chú.");
      }
    }
  };

  const openAddForm = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };
  
  const openEditForm = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-600">Trang Quản Trị</h1>
          <div className="flex items-center gap-4">
             <span className="text-gray-700">{user?.email}</span>
             <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Đăng Xuất
             </button>
             <a href="#" className="text-cyan-600 hover:underline">Về trang chủ</a>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Quản lý Ghi Chú</h2>
            <button onClick={openAddForm} className="px-5 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                + Thêm Ghi Chú Mới
            </button>
        </div>

        {isFormOpen && (
            <NoteForm 
                onSubmit={editingNote ? handleUpdateNote : handleAddNote}
                onCancel={() => { setIsFormOpen(false); setEditingNote(null); }}
                initialData={editingNote}
            />
        )}
        
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            {loading ? <p>Đang tải...</p> : (
            <table className="w-full min-w-max">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {notes.map(note => (
                        <tr key={note.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{note.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${note.category === 'Chuẩn Bị' ? 'bg-cyan-100 text-cyan-800' : 'bg-indigo-100 text-indigo-800'}`}>
                                    {note.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => openEditForm(note)} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</button>
                                <button onClick={() => handleDeleteNote(note.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
      </main>
    </div>
  );
};