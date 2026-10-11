import { useState, useEffect } from 'react';
import { NotesList } from './components/NotesList';
import { NotesForm } from './components/NotesForm';
import type { Note } from './types';

const API_URL = 'http://localhost:7070/notes';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Получение заметок (GET)
  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const data = await response.json() as Note[];
      setNotes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Не удалось загрузить заметки');
      }
    } finally {
      setLoading(false);
    }
  };

  // Первоначальная загрузка без вызова setState синхронно в теле эффекта
  useEffect(() => {
    let ignore = false;

    const startFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const data = await response.json() as Note[];
        if (!ignore) {
          setNotes(data);
        }
      } catch (err: unknown) {
        if (!ignore) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Не удалось загрузить заметки');
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    startFetch();

    return () => {
      ignore = true;
    };
  }, []);

  // 2. Добавление заметки (POST) -> Ожидаем статус 204
  const handleAddNote = async (content: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 0, content }),
      });

      if (!response.ok) {
        throw new Error(`Не удалось добавить заметку. Статус: ${response.status}`);
      }
      
      setLoading(true);
      await fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Неизвестная ошибка при добавлении');
      }
    }
  };

  // 3. Удаление заметки (DELETE) -> Ожидаем статус 204
  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Не удалось удалить заметку. Статус: ${response.status}`);
      }

      setLoading(true);
      await fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Неизвестная ошибка при удалении');
      }
    }
  };

  // Ручное обновление списка по кнопке
  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    void fetchNotes();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1>Заметки</h1>
        <button 
          onClick={handleRefresh} 
          style={styles.refreshBtn} 
          title="Обновить список"
          disabled={loading}
        >
          🔄
        </button>
      </div>

      {loading && <p>Синхронизация данных...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && <NotesList notes={notes} onDelete={handleDeleteNote} />}
      
      <NotesForm onAdd={handleAddNote} />
    </div>
  );
}

const styles = {
  refreshBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    transition: 'transform 0.2s',
  }
};

export default App;
