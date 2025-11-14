import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Note, Category } from '../types';

interface NoteCardProps {
  note: Note;
  onImageClick: (imageUrl: string) => void;
  isActive: boolean;
  onToggle: () => void;
}

const CategoryBadge: React.FC<{ category: Category }> = ({ category }) => {
  const isPreparation = category === Category.PREPARATION;
  const bgColor = isPreparation ? 'bg-cyan-100 text-cyan-800' : 'bg-indigo-100 text-indigo-800';
  return (
    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${bgColor}`}>
      {category}
    </span>
  );
};

// Helper function to convert YouTube URL to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';

  // Already an embed URL
  if (url.includes('/embed/')) return url;

  // Extract video ID from various YouTube URL formats
  let videoId = '';

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1]?.split('&')[0];
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]?.split('?')[0];
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (url.includes('/v/')) {
    videoId = url.split('/v/')[1]?.split('?')[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export const NoteCard: React.FC<NoteCardProps> = ({ note, onImageClick, isActive, onToggle }) => {
  const embedUrl = note.videoUrl ? getYouTubeEmbedUrl(note.videoUrl) : '';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-expanded={isActive}
        aria-controls={`note-content-${note.id}`}
      >
        <div className="flex-grow pr-4">
            <CategoryBadge category={note.category} />
            <h3 className="mt-2 text-xl font-bold text-gray-800">{note.title}</h3>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${isActive ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={`note-content-${note.id}`}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className="px-6 pb-6 pt-0 overflow-hidden">
          {/* Media section - Image and Video first */}
          {note.imageUrl && (
            <img
              src={note.imageUrl}
              alt={note.title}
              className="mt-4 w-full h-auto object-cover cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow"
              onClick={() => onImageClick(note.imageUrl!)}
              loading="lazy"
            />
          )}

          {embedUrl && (
            <div className="mt-4">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedUrl}
                  title={note.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg border-0 shadow-md"
                ></iframe>
              </div>
            </div>
          )}

          {/* Description with custom markdown styling */}
          <div className="mt-4 text-gray-700 leading-relaxed markdown-content">
            <ReactMarkdown>{note.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
