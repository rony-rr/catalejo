import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { ButtonComponent } from "../Buttons";

export const ExportToExcel = ({ textBtn, dataExport, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
	const exportToCSV = (dataExport, fileName) => {
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
		<ButtonComponent
			type="link"
			className="a-btn--bgTransparent"
			text={textBtn}
			onClick={() => exportToCSV(dataExport, fileName)}
		/>

  );
};
