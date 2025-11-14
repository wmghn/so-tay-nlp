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

export const NoteCard: React.FC<NoteCardProps> = ({ note, onImageClick, isActive, onToggle }) => {
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
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="mt-2 text-gray-600 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{note.description}</ReactMarkdown>
          </div>

          {note.imageUrl && (
            <img
              src={note.imageUrl}
              alt={note.title}
              className="mt-4 w-full h-auto object-cover cursor-pointer rounded-lg shadow-md"
              onClick={() => onImageClick(note.imageUrl!)}
              loading="lazy"
            />
          )}

          {note.videoUrl && (
            <div className="mt-6">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={note.videoUrl}
                  title={note.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
