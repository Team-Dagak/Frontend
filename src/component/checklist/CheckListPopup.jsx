import { useState } from "react";
import styled from "@emotion/styled";

// 스타일
const Container = styled.div`
  position: fixed;
  z-index: 2000;
  width: 361px;
  padding: 18px;
  background: #fff;
  border-radius: 16px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
`;

const ChecklistInput = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 1rem;
  margin-right: 8px;
  border-radius: 6px;
  border: 1px solid #eee;
`;

const Button = styled.button`
  padding: 7px 14px;
  border-radius: 8px;
  border: none;
  margin-left: 5px;
  background: #5171f6;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export default function ChecklistPopup({ onConfirm, onCancel }) {
  // checklist 배열 관리 [{Checklist, clear: false}, ...]
  const [Checklists, setChecklists] = useState([{ Checklist: "", clear: false }]);

  // checklist 항목 추가
  const handleAdd = () => setChecklists([...Checklists, { Checklist: "", clear: false }]);
  // checklist 항목 삭제
  const handleRemove = (idx) => setChecklists(Checklists.filter((_, i) => i !== idx));
  // checklist 항목 내용 변경
  const handleChange = (idx, value) =>
    setChecklists(Checklists.map((item, i) =>
      i === idx ? { ...item, Checklist: value } : item
    ));

  // 등록(목표 + checklist)
  const handleRegister = () => {
    // 빈 Checklist는 제외
    const clean = Checklists.filter(t => t.Checklist.trim());
    if (clean.length === 0) {
      alert("최소 1개 이상의 할 일을 입력해 주세요.");
      return;
    }
    onConfirm(clean);
  };

  return (
    <Container>
      <h3 style={{marginBottom: "1rem"}}>작은 목표(할 일) 추가</h3>
      {Checklists.map((item, i) => (
        <ListItem key={i}>
          <ChecklistInput
            type="text"
            value={item.Checklist}
            onChange={e => handleChange(i, e.target.value)}
            placeholder={`작은 목표/할 일 #${i+1}`}
          />
          {Checklists.length > 1 && (
            <Button onClick={() => handleRemove(i)} style={{background:"#ddd", color:"#333"}}>삭제</Button>
          )}
        </ListItem>
      ))}
      <div style={{marginBottom: 12}}>
        <Button onClick={handleAdd} style={{background:"#eee", color:"#333"}}>+ 추가</Button>
      </div>
      <div style={{display:"flex", justifyContent:"flex-end", gap:12}}>
        <Button onClick={onCancel} style={{background:"#f3f3f3", color:"#888"}}>취소</Button>
        <Button onClick={handleRegister}>등록</Button>
      </div>
    </Container>
  );
}
