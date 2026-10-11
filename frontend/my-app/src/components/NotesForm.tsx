import React, { useState } from 'react';

interface NotesFormProps {
  onAdd: (content: string) => void;
}

export const NotesForm: React.FC<NotesFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return; // Валидация пустого поля
    onAdd(text);
    setText(''); // Очистка поля
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        style={styles.textarea}
        rows={3}
        placeholder="Введите текст заметки..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" style={styles.button}>Добавить</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    maxWidth: '400px',
    marginTop: '20px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical' as const,
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
