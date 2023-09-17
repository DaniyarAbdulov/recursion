import React, { useState } from "react";
import "./App.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface Item {
  id: string;
  label: string;
  parentId: string | null;
  visible: boolean;
}

const initialData: Item[] = [
  { id: "0", label: "Первый уровень", parentId: null, visible: true },
];

const App = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const [currentId, setCurrentId] = useState<number>(1);

  const addLevel = (parentId: string | null) => {
    const children = data.filter((item) => item.parentId === parentId);
    const nextChildNumber = children.length + 1;
    const newItem: Item = {
      id: `${parentId || "root"}-${nextChildNumber}`,
      label: parentId
        ? `Подуровень ${nextChildNumber}`
        : `Первый уровень ${nextChildNumber}`,
      parentId,
      visible: true,
    };

    if (!parentId) {
      setCurrentId(currentId + 1);
    }

    setData([...data, newItem]);
  };

  const deleteLevel = (itemId: string) => {
    const filteredData = data.filter((item) => item.id !== itemId);

    // Рекурсивно удаляем всех детей элемента
    const deleteChildren = (parentId: string | null) => {
      const childrenToDelete = filteredData.filter(
        (item) => item.parentId === parentId
      );
      childrenToDelete.forEach((child) => {
        filteredData.splice(
          filteredData.findIndex((item) => item.id === child.id),
          1
        );
        deleteChildren(child.id);
      });
    };

    deleteChildren(itemId);
    setData(filteredData);
  };

  const toggleVisibility = (itemId: string) => {
    const updatedData = [...data];
    const item = updatedData.find((item) => item.id === itemId);

    if (item) {
      item.visible = !item.visible;

      // Рекурсивно скрываем/показываем всех детей элемента
      const toggleChildrenVisibility = (parentId: string | null, visible: boolean) => {
        const childrenToUpdate = updatedData.filter(
          (child) => child.parentId === parentId
        );
        childrenToUpdate.forEach((child) => {
          child.visible = visible;
          toggleChildrenVisibility(child.id, visible);
        });
      };

      toggleChildrenVisibility(itemId, item.visible);
      setData(updatedData);
    }
  };

  const moveItem = (itemId: string, newIndex: number) => {
    const updatedData = [...data];
    const currentItem = updatedData.find((item) => item.id === itemId);
    const currentIndex = updatedData.findIndex((item) => item.id === itemId);

    updatedData.splice(currentIndex, 1);
    updatedData.splice(newIndex, 0, currentItem as Item);

    setData(updatedData);
  };

  const renderItems = (parentId: string | null) => {
    const items = data.filter((item) => item.parentId === parentId);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{ marginLeft: item.parentId ? "20px" : "0px" }}
          >
            <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
              <div>{item.label}</div>
              <div>
                <button onClick={() => toggleVisibility(item.id)}>^</button>
                <button onClick={() => addLevel(item.id)}>+</button>
                <button onClick={() => deleteLevel(item.id)}>Корзина</button>
                <button onClick={() => toggleVisibility(item.id)}>Глаз</button>
                <button
                  onClick={() => moveItem(item.id, data.indexOf(item) - 1)}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveItem(item.id, data.indexOf(item) + 1)}
                >
                  ↓
                </button>
              </div>
            </div>

            {item.visible && renderItems(item.id)}
          </div>
        ))}
      </div>
    );
  };

  return <div className="App">{renderItems(null)}</div>;
};

export default App;
