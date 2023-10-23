import React, { MouseEventHandler, useCallback, useState } from "react";
// import "./table.css"; // CSS樣式文件

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
};

type SortOrder = "ascn" | "desc";
// 定義SortOrder類型，表示排序的方式，可以是升序（ascn）或降序（desc）。

type SortableTableProps = {
  data: Person[];
};
// 定義SortableTableProps介面，表示SortableTable元件的屬性，其中包括一個Person類型的陣列data。

const SortableTable: React.FC<SortableTableProps> = ({ data }) => {
  const [sortKey, setSortKey] = useState<keyof Person>("last_name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  // 使用useState hook來維護排序的狀態，包括排序的鍵（sortKey）和排序的方式（sortOrder）。
//sortKey 的預設值被設置為 "last_name"，表格會根據 last_name 欄位的值來進行排序。當用戶點擊其他欄位的排序按鈕時，sortKey 的值會被更新為對應欄位的名稱，這樣就可以根據新的 sortKey 來重新排序表格中的資料。
  const sortedData = useCallback(() => {
    return data.slice().sort((a, b) =>
      sortOrder === "ascn" ? (a[sortKey] > b[sortKey] ? 1 : -1) : b[sortKey] > a[sortKey] ? 1 : -1
    );
  }, [data, sortKey, sortOrder]);
  // 使用useCallback hook來緩存排序過的資料，根據sortKey和sortOrder的值來執行適當的排序邏輯。

  const changeSort = (key: keyof Person) => {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  };
  // 定義changeSort函數，根據指定的鍵值（key）來切換排序的方式（升序或降序）。
//   在 changeSort 函數中，sortKey 會被設置為新的欄位名稱，然後根據 sortOrder 的值（"ascn" 表示升序，"desc" 表示降序）來更新表格的排序順序。
// 這樣，當表格按鈕時，sortKey 會被設置為對應的欄位名稱，然後表格會根據 sortKey 和 sortOrder 的值來重新排序顯示的資料
  return (
    <TableContainer component={Paper} style={{ maxHeight: 400, overflowY: "scroll" }}>
      <Table>
        <TableHead>
          <TableRow className="sticky-header">
            {["id", "first_name", "last_name", "email", "gender", "ip_address"].map((key) => (
              <TableCell key={key}>
                {key}{" "}
                <Button onClick={() => changeSort(key as keyof Person)}>
                  {sortKey === key ? (sortOrder === "ascn" ? <ArrowUpward /> : <ArrowDownward />) : null}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData().map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.first_name}</TableCell>
              <TableCell>{person.last_name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.gender}</TableCell>
              <TableCell>{person.ip_address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
// 定義SortableTable元件，它接收一個data屬性，根據這個屬性中的資料呈現一個可以排序的表格。

export default SortableTable;
