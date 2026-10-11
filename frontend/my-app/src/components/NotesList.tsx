import React from 'react';
import { NoteCard } from './NoteCard';
import type { Note } from '../types';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) {
    return <p>Заметок пока нет. Добавьте первую!</p>;
  }

  return (
    <div style={styles.list}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '20px',
    marginTop: '20px',
  },
};
