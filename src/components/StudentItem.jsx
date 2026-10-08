// Component cháu: hiển thị chi tiết 1 sinh viên
const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, class: className } = student;
  const rank = score >= 8 ? 'Giỏi' : score < 5 ? 'Trượt' : 'Đạt';

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td>{score}</td>
      <td>{rank}</td>
      <td>
        <button className="danger" onClick={() => onDelete(id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;