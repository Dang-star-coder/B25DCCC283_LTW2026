import { useState } from 'react';
import StudentList from './components/StudentList.jsx';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'LTW01' },
  { id: 2, name: 'Trần Thị Bình', score: 6.5, class: 'LTW01' },
  { id: 3, name: 'Lê Hoàng Cường', score: 4.0, class: 'LTW02' },
];

const emptyForm = { name: '', score: '', class: '' };

// Component cha: quản lý state chính (danh sách, bộ lọc)
const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState('all'); // all | good | fail
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const { name, score, class: className } = form;

  const handleChange = ({ target: { name: field, value } }) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleAdd = (e) => {
    e.preventDefault();
    const scoreNum = Number(score);

    if (!name.trim() || !className.trim() || score === '') {
      return setError('Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp.');
    }
    if (Number.isNaN(scoreNum) || scoreNum < 0 || scoreNum > 10) {
      return setError('Điểm số phải nằm trong khoảng từ 0 đến 10.');
    }

    const nextId = students.reduce((max, s) => Math.max(max, s.id), 0) + 1;
    setStudents((prev) => [
      ...prev,
      { id: nextId, name: name.trim(), score: scoreNum, class: className.trim() },
    ]);
    setForm(emptyForm);
    setError('');
  };

  const handleDelete = (id) =>
    setStudents((prev) => prev.filter((s) => s.id !== id));

  const visibleStudents = students.filter(({ score: s }) => {
    if (filter === 'good') return s >= 8;
    if (filter === 'fail') return s < 5;
    return true;
  });

  const total = students.length;
  const average =
    total === 0 ? 0 : students.reduce((sum, { score: s }) => sum + s, 0) / total;

  return (
    <main>
      <h1>Quản lý điểm sinh viên</h1>

      <form onSubmit={handleAdd} noValidate>
        <input name="name" placeholder="Họ tên" value={name} onChange={handleChange} />
        <input
          name="score"
          type="number"
          step="0.1"
          placeholder="Điểm (0-10)"
          value={score}
          onChange={handleChange}
        />
        <input name="class" placeholder="Lớp" value={className} onChange={handleChange} />
        <button type="submit">Thêm</button>
      </form>
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          Tất cả
        </button>
        <button className={filter === 'good' ? 'active' : ''} onClick={() => setFilter('good')}>
          Giỏi (≥ 8)
        </button>
        <button className={filter === 'fail' ? 'active' : ''} onClick={() => setFilter('fail')}>
          Trượt (&lt; 5)
        </button>
      </div>

      <StudentList students={visibleStudents} onDelete={handleDelete} />

      <p className="stats">
        {`Tổng số sinh viên: ${total} | Điểm trung bình: ${average.toFixed(2)}`}
      </p>
    </main>
  );
};

export default App;