import React from 'react';
import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div style={styles.card}>
      <button style={styles.deleteBtn} onClick={() => onDelete(note.id)}>
        ×
      </button>
      <p style={styles.content}>{note.content}</p>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative' as const,
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    minWidth: '200px',
    maxWidth: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  deleteBtn: {
    position: 'absolute' as const,
    top: '5px',
    right: '5px',
    background: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center' as const,
  },
  content: {
    margin: 0,
    wordBreak: 'break-word' as const,
  },
};
