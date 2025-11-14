import type { CheckList } from "@/types/types";
import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div``;
const ChecklistInput = styled.input``;
const Button = styled.button``;
const ListItem = styled.div``;

interface ChecklistPopupProp {
    onConfirm: (items: CheckList) => void;
    onCancel: () => void;
}

export default function ChecklistPopup({
    onConfirm,
    onCancel,
}: ChecklistPopupProp) {
    const [Checklists, setChecklists] = useState<CheckList>([
        { checkListName: "", clear: false },
    ]);

    // 액션 핸들러
    const handleAdd = () =>
        setChecklists([...Checklists, { checkListName: "", clear: false }]);
    const handleRemove = (idx: number) =>
        setChecklists(Checklists.filter((_, i) => i !== idx));
    const handleChange = (idx: number, value: string) =>
        setChecklists(
            Checklists.map((item, i) =>
                i === idx ? { ...item, Checklist: value } : item
            )
        );

    const handleRegister = () => {
        const clean = Checklists.filter((t) => t.checkListName!.trim());
        if (clean.length === 0) {
            alert("최소 1개 이상의 할 일을 입력해 주세요.");
            return;
        }
        onConfirm(clean);
    };

    return (
        <Container>
            <h3 style={{ marginBottom: "1rem" }}>작은 목표(할 일) 추가</h3>
            {Checklists.map((item, i) => (
                <ListItem key={i}>
                    <ChecklistInput
                        type="text"
                        value={item.checkListName}
                        onChange={(e) => handleChange(i, e.target.value)}
                        placeholder={`작은 목표/할 일 #${i + 1}`}
                    />
                    {Checklists.length > 1 && (
                        <Button
                            onClick={() => handleRemove(i)}
                            style={{ background: "#ddd", color: "#333" }}
                        >
                            삭제
                        </Button>
                    )}
                </ListItem>
            ))}
            <div style={{ marginBottom: 12 }}>
                <Button
                    onClick={handleAdd}
                    style={{ background: "#eee", color: "#333" }}
                >
                    + 추가
                </Button>
            </div>
            <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
            >
                <Button
                    onClick={onCancel}
                    style={{ background: "#f3f3f3", color: "#888" }}
                >
                    취소
                </Button>
                <Button onClick={handleRegister}>등록</Button>
            </div>
        </Container>
    );
}
