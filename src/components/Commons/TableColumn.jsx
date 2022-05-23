import { Table, Button } from "antd";
import { DeleteOutlined, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

// Call component on Table
const findIndexByID = (arrayData, recordID) => {
  if (arrayData && arrayData.length > 0) {
    return arrayData.findIndex((item) => recordID === item.id);
  }
};
const configs = (event) => {
  return {
    dataSource: event.dataSource,
    tableIndex: event.tableIndex,
    addRow: event.addRow,
    onSaveData: event.onSaveData,
    deleteData: event.deleteData, // delete data call api
    deleteRow: event.deleteRow, // delete row when add new
    onDelete: event.onDelete, // use for delete row with delete data
    width: event.width,
    style: event.style,
    hiddenAdd: event.hiddenAdd || false, // hidden add btn
    hiddenSave: event.hiddenSave || false, // hidden save btn
    hiddenDelete: event.hiddenDelete || false, // hidden delete btn
  };
};
const configDelete = (options, record) => {
  const onDelete = options?.onDelete;
  if (!!onDelete) {
    return onDelete();
  } else {
    return !!record?.isNew ? options?.deleteRow() : options?.deleteData();
  }
};
const ButtonAddRow = (options) => () =>
  (
    <Button
      size="small"
      hidden={!!options.hiddenAdd}
      style={{ width: "35px" }}
      onClick={() => options.addRow()}
      type="primary"
      icon={<PlusOutlined />}
    ></Button>
  );
const ButtonSaveRow = (options, record) => (
  <Button
    size="small"
    hidden={
      !!options.hiddenSave ||
      options?.tableIndex !== findIndexByID(options?.dataSource, record.id)
    }
    style={{ marginRight: "5px", color: "green" }}
    onClick={() => options?.onSaveData()}
    icon={<SaveOutlined />}
  ></Button>
);
// note:  add pro isNew into my object of AddRow function
/**
 Example: in AddRow function
 const newRecord = { id: '', name: '', isNew: true}
 dataSouce.unshift(newRecord)
 */
const ButtonDeleteRow = (options, record) => (
  <Button
    size="small"
    hidden={
      !!options.hiddenDelete ||
      options?.tableIndex !== findIndexByID(options?.dataSource, record.id)
    }
    style={{ color: "red" }}
    onClick={() => configDelete(options, record)}
    icon={<DeleteOutlined />}
  ></Button>
);
const renderTableColumn = (options) => (item, record, index) =>
  (
    <div style={{ textAlign: "center" }}>
      {ButtonSaveRow(options, record)}
      {ButtonDeleteRow(options, record)}
    </div>
  );
const ColumnButtonCustom = (options) => {
  return (
    <Table.Column
      width={options?.width || 120}
      title={ButtonAddRow(options)}
      style={{ textAlign: "center" } || options?.style}
      render={renderTableColumn(configs(options))}
    />
  );
};
export default ColumnButtonCustom;
