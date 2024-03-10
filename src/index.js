import React, { useState, useEffect, useCallback } from "react";
import { render } from "react-dom";
import "./css/myfoundation.css";
//import ReactDataGrid from "@inovua/reactdatagrid-community";
//import "@inovua/reactdatagrid-community/index.css";
import ReactDataGrid from "@inovua/reactdatagrid-enterprise";
import "@inovua/reactdatagrid-enterprise/index.css";
import "@inovua/reactdatagrid-community/theme/default-dark.css";
import "@inovua/reactdatagrid-community/theme/default-light.css";
import "@inovua/reactdatagrid-community/theme/blue-dark.css";

render(
  <App></App>,
  $("#root")[0]
);

function App() {
  const [groupBy, setGroupBy] = useState(["stage", "highValue"]);
  const [dataSource, setDataSource] = useState([rawDataSource]);

  const onEditComplete = useCallback(({ value, columnId, rowId, rowIndex }) => {
    console.log("value, columnId, rowIndex", value, columnId, rowIndex, rowId);
    setDataSource((prev) => {
      const data = prev.map((row) => {
        return row.id === rowId
          ? {
            ...row,
            [columnId]: value,
          }
          : { ...row };
      });
      return data;
    });
  }, []);

  const onRowReorder = useCallback(({ data, dragRowIndex, insertRowIndex }) => {
    console.log("onRowReoreder", data, dragRowIndex, insertRowIndex);
  }, []);

  const onGroupByChange = useCallback((props) => {
    console.log("onGroupByChange", { ...props });
    setGroupBy(props);
  });

  function addRow({ data }) {
    const { fieldPath, keyPath } = data;
    let dataRow = LineItemDefault;
    dataRow.Id = 0;
    dataRow.description = "";
    console.log("addRow", fieldPath, keyPath);
    if (fieldPath) {
      fieldPath.forEach((field, index) => {
        dataRow[field] = keyPath[index];
      });
    }
    setDataSource((prev) => prev.concat([dataRow]));
  }

  const removeRow = useCallback(({ rowIndex }) => {
    setDataSource((prev) => {
      let data = prev.toSpliced(rowIndex - 1, 1);

      return data;
    });
  }, []);

  function actionChooser(data) {
    return {
      action: data?.__group ? addRow : removeRow,
      symbol: data?.__group ? "+" : "-",
    };
  }

  const gridStyle = { minHeight: 550 };
  const groupColumn = {
    renderGroupValue: ({ value }) =>
      value === "true" || value === true
        ? "High Value Material"
        : value === "false" || value === false
          ? "Base Material"
          : value,
  };

  const defaultGroupBy = [
    "stage",
    "highValue"
  ];

  const rawDataSource = [
    {
      "stage": "fabrication",
      "description": "14/20 Yellow Gold-Filled 1.3mm Lightweight Oval Cable Chain (By the Foot)",
      "unit": "foot",
      "highValue": false,
      "Id": "KxHNbsD2tOvPJR2yso2L",
      "count": 1.5,
      "rate": 7.27,
      "commodity": "zmmIDMDjMwCOhvtweWyL",
      "refPath": "User/oCcnZPCzYSMLwC0rOwFnGVH4Yhv1/Products/863d5YO1CUEIEeuCsKQw/LineItem/KxHNbsD2tOvPJR2yso2L",
      "id": "KxHNbsD2tOvPJR2yso2L"
    },
    {
      "description": "14/20 Yellow Gold-Filled Closed-Ring Spring Ring Clasp (by the each)",
      "unit": "ea",
      "commodity": "x0BUhAgNcGE3uuT8umPH",
      "Id": "XPLkB5rzO7YDYEg6JsKw",
      "count": 1,
      "rate": "0.72",
      "stage": "fabrication",
      "highValue": false,
      "refPath": "User/oCcnZPCzYSMLwC0rOwFnGVH4Yhv1/Products/863d5YO1CUEIEeuCsKQw/LineItem/XPLkB5rzO7YDYEg6JsKw",
      "id": "XPLkB5rzO7YDYEg6JsKw"
    },
    {
      "description": "14/20 Yellow Gold-Filled Round Wire, 22-Ga., 1/2-Hard (by the inch)",
      "count": 3,
      "highValue": false,
      "rate": 0.27,
      "unit": "inch",
      "Id": "wbbmzyfeViNxTcWxm3uK",
      "stage": "fabrication",
      "commodity": "",
      "refPath": "User/oCcnZPCzYSMLwC0rOwFnGVH4Yhv1/Products/863d5YO1CUEIEeuCsKQw/LineItem/wbbmzyfeViNxTcWxm3uK",
      "id": "wbbmzyfeViNxTcWxm3uK"
    }
  ];

  const columnData = useMemo(() => {
    return [
      {
        "name": "stage",
        "header": "stage",
        "render": null,
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": true,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editorProps": {
          "theme": "default-dark"
        },
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          "style": { paddingRight: 20 },
        }),
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
      },
      {
        "name": "highValue",
        "header": "highValue",
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": true,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
      },
      {
        "name": "image",
        "header": "image",
        "render": null,
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
      },
      {
        "name": "description",
        "header": "description",
        "render": null,
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "textEllipsis": true,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
      },
      {
        "name": "count",
        "header": "count",
        "render": null,
        "textAlign": "end",
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": "number",
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editor": NumericEditor,
        "editorProps": {
          "step": 0.01,
          "shiftStep": 1,
          "allowNegative": false
        },
        "editable": editable,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
      },
      {
        "name": "unit",
        "header": "unit",
        "render": null,
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
      },
      {
        "name": "rate",
        "header": "rate",
        "render": null,
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": "number",
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editor": NumericEditor,
        "editorProps": {
          "step": 0.01,
          "shiftStep": 1,
          "allowNegative": false
        },
        "editable": editable,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
      },
      {
        "name": "line_total",
        "header": "line total",
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 2,
        "visible": true,
        "groups": null,
        "groupBy": false,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editable": false,
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
        "render": (columnRenderProps) => {
          // if you want to custom-render the summary value for this column
          // you can do so
          return columnRenderProps.data?.__group
            ? columnRenderProps.data.groupSummary[line_total]
            : (lineItem) => {
              return lineItem?.rate * lineItem?.count;
            };
        },
      },
      {
        "name": "actions",
        "header": "actions",
        "textAlign": null,
        "textVerticalAlign": null,
        "headerAlign": null,
        "headerVerticalAlign": null,
        "type": null,
        "flex": 1,
        "visible": true,
        "groups": null,
        "groupBy": null,
        "groupSummaryReducer": null,
        "headerEllipsis": true,
        "hideable": false,
        "pivotToString": null,
        "sort": null,
        "sortable": true,
        "editable": editable,
        "editorProps": {
          "theme": "default-dark",
        },
        "cellDOMProps": (cellProps) => ({
          ...cellProps,
          style: { paddingRight: 20 },
        }),
        "render": (props) => {
          const myProps = { ...props };
          const { data } = myProps;
          const background = "#7986cb";
          const border = "2px solid #7986CB";
          const clickFunction = actionChooser(data)?.action;

          return (
            <div
              style={{
                cursor: "pointer",
                background,
                borderRadius: "50%",
                height: "24px",
                width: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border,
                fontSize: 12,
                color: "#E8E8E8",
              }}
              onClick={(e) => {
                e.stopPropagation();
                clickFunction(myProps);
              }}
            >
              {actionChooser(data)?.symbol}
            </div>
          );
        },
      }
    ];
  }, []);

  async function editable(editValue, cellProps) {
    return !cellProps.data.commodity;
  }

  function gridSummaryReducer(acc, data) {
    return {
      line_total: acc.line_total + Forms.LineSum[LINEITEM](data),
    };
  }

  const groupSummaryReducer = {
    initialValue: { line_total: 0 },
    reducer: gridSummaryReducer,
  };

  return (
    <>
      <TableForm
        columns={columnData}
        dataSource={dataSource}
        defaultGroupBy={defaultGroupBy}
        groupBy={groupBy}
        groupColumn={groupColumn}
        groupColumnVisible={false}
        theme="default-dark"
        hideGroupByColumns={false}
        groupSummaryReducer={groupSummaryReducer}
        style={gridStyle}
        showCellBorders={true}
        onEditComplete={onEditComplete}
        onRowReorder={onRowReorder}
        onGroupByChange={onGroupByChange}
      />
    </>
  );
}

function TableForm(props) {
  return (
    <div className="background-revert">
      <ReactDataGrid
        {...props}
        reorderColumns={false}
        rowReorderColumn
        allowRowReorderBetweenGroups={true}
        renderRowReorderProxy={renderRowReorderProxy}
        clearDataSourceCacheOnChange={true}
      />
    </div>
  );
}

const renderRowReorderProxy = ({ data }) => {
  return (
    <div style={{ paddingLeft: 30 }}>
      ID: {data.id} - Description: {data.description}
    </div>
  );
};

/**
 * @readonly
 * @constant
 * @type {LineItem}
 * @default
 */
const LineItemDefault = {
  Id: null,
  refPath: null,
  product: null,
  stage: "fabrication",
  commodity: null,
  description: null,
  unit: null,
  rate: 0,
  count: 0,
  highValue: false,
  image: null,
};

