import React, { useState, useMemo, useEffect } from 'react';
import { NoteCard } from './components/NoteCard';
import { SearchBar } from './components/SearchBar';
import { ImageModal } from './components/ImageModal';
import { Category, Note } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  useEffect(() => {
    setLoading(true);
    fetch('/data/notes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setNotes(data.notes); // Assuming the JSON is structured as { "notes": [...] }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching notes: ", error);
        setLoading(false);
      });
  }, []);

  const filteredNotes = useMemo(() => {
    let results = notes;

    if (selectedCategory !== 'all') {
      results = results.filter(note => note.category === selectedCategory);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(
        (note) =>
          note.title.toLowerCase().includes(lowercasedTerm) ||
          note.description.toLowerCase().includes(lowercasedTerm) ||
          note.category.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    return results;
  }, [notes, searchTerm, selectedCategory]);
  
  const handleImageClick = (imageUrl: string) => {
    setZoomedImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setZoomedImageUrl(null);
  };

  const handleToggleNote = (noteId: string) => {
    setActiveNoteId(activeNoteId === noteId ? null : noteId);
  };

  const filterOptions: { label: string, value: Category | 'all' }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: Category.PREPARATION, value: Category.PREPARATION },
    { label: Category.PROCESS, value: Category.PROCESS },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50 font-sans">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold text-cyan-600">
                Sổ Tay Phụng Sự NLP
              </h1>
              <div className="w-full sm:w-auto sm:max-w-xs">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap justify-center gap-3 mb-8" role="toolbar" aria-label="Lọc ghi chú">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                aria-pressed={selectedCategory === option.value}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 shadow-md
                  ${selectedCategory === option.value
                    ? 'bg-cyan-600 text-white scale-105 shadow-lg'
                    : 'bg-white text-gray-800 hover:bg-cyan-50 hover:shadow-lg'
                  }`
                }
              >
                {option.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Đang tải ghi chú...</p>
            </div>
          ) : filteredNotes.length > 0 ? (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onImageClick={handleImageClick}
                  isActive={note.id === activeNoteId}
                  onToggle={() => handleToggleNote(note.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Không tìm thấy ghi chú nào phù hợp.</p>
            </div>
          )}
        </main>
        
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>Tạo bởi người phụng sự bằng cả trái tim. <a href="/admin/" className="text-cyan-600 hover:underline">Quản trị</a></p>
        </footer>
      </div>
      <ImageModal imageUrl={zoomedImageUrl} onClose={handleCloseModal} />
    </>
  );
};


export default App;