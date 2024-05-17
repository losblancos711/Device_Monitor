import * as React from "react";
import { Device, DeviceLocation } from "../../schema/Device";
import { DEVICESTATUS, DOWNLOADSTATUS } from "../../schema/enums";
import {
  Button,
  IconButton,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useStore } from "../../store/store";
import { Pagination } from "../Pagination/Pagination";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Search } from "@mui/icons-material";
import { computeDownStatusColor } from "../../helpers/computeDownStatusColor";
import filterImg from "../../assets/filter.png";
import styles from "./DevicesTable.module.css";

function createData(
  id: string,
  serialNo?: string,
  theatreName?: string,
  location?: DeviceLocation,
  bandwidth?: string,
  avgBandwidth?: string,
  deviceStatus?: DEVICESTATUS | string,
  downloadStatus?: DOWNLOADSTATUS | string,
  osVersion?: string
): Device {
  return {
    id,
    serialNo,
    theatreName,
    location,
    bandwidth,
    avgBandwidth,
    deviceStatus,
    downloadStatus,
    osVersion,
  };
}

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "1",
    label: "Device Serial",
    numeric: false,
  },
  {
    id: "2",
    label: "Location",
    numeric: false,
  },
  {
    id: "3",
    label: "Bandwidth",
    numeric: false,
  },
  {
    id: "4",
    label: "Status",
    numeric: false,
  },
  {
    id: "5",
    label: "Download status",
    numeric: false,
  },
  {
    id: "6",
    label: "OS Version",
    numeric: false,
  },
  {
    id: "6",
    label: "",
    numeric: false,
  },
];

interface DevicesTableProps {
  tableData: Device[];
}

interface MyCallback {
  (): void;
}

export const DevicesTable = ({ tableData }: DevicesTableProps) => {
  const initialRows = tableData?.map((td) =>
    createData(
      td?.id,
      td?.serialNo,
      td?.theatreName,
      td?.location,
      td?.bandwidth,
      td?.avgBandwidth,
      td?.deviceStatus,
      td?.downloadStatus,
      td?.osVersion
    )
  );

  const [rows, setRows] = useState(initialRows);

  const [currentPage, setCurrentPage] = React.useState(1);
  const { currentPageSize } = useStore();

  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * currentPageSize;
    const lastPageIndex = firstPageIndex + currentPageSize;
    return rows.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, currentPageSize, rows?.length]);

  const debounce = (cb: any, delay: number) => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const updateFilterText = debounce((key?: string) => {
    const newRows = tableData.filter((row) =>
      row?.theatreName?.toLowerCase()?.includes(key || "")
    );
    setRows(newRows);
  }, 1000);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e?.target?.value?.toLowerCase();
    updateFilterText(key);
  };

  return (
    <>
      <TableContainer className={styles.tableContainer} component={Paper}>
        <div className={styles.paginationContainer}>
          <div style={{ position: "relative" }}>
            <OutlinedInput
              onChange={searchHandler}
              className={styles.search}
              placeholder="Search Theatre"
            />
            <IconButton disabled className={styles.searchIcon} size="small">
              <Search />
            </IconButton>
            <Button className={styles.dummyFilterBtn}>
              <img alt={"icon"} src={filterImg} /> Filter
            </Button>
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={rows?.length}
            pageSize={currentPageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((hd, i) => (
                <TableCell key={i} align="left">
                  {hd.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row?.serialNo}</TableCell>
                <TableCell align="left">
                  <div>
                    <h6>{row?.theatreName}</h6>
                    <p style={{ color: "#084782", marginTop: "5px" }}>
                      {row?.location?.city +
                        ", " +
                        row?.location?.state +
                        ", " +
                        row?.location?.country}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div>
                    <h6>{row?.bandwidth}</h6>
                    <p style={{ color: "#69788C", marginTop: "5px" }}>
                      {row?.avgBandwidth}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div>
                    <div
                      style={{
                        backgroundColor:
                          row?.deviceStatus === DEVICESTATUS.Online
                            ? "green"
                            : "red",
                        width: "8px",
                        height: "8px",
                        borderRadius: "3px",
                        marginRight: "12px",
                        display: "inline-block",
                        fontSize: "14px",
                      }}
                    ></div>
                    {row?.deviceStatus}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div>
                    <div
                      style={{
                        backgroundColor: computeDownStatusColor(
                          row?.downloadStatus
                        ),
                        width: "8px",
                        height: "8px",
                        borderRadius: "3px",
                        marginRight: "12px",
                        display: "inline-block",
                        fontSize: "14px",
                      }}
                    ></div>
                    {row?.downloadStatus}
                  </div>
                </TableCell>
                <TableCell align="left">{row?.osVersion}</TableCell>
                <TableCell align="center">
                  <Link to={`/devices/${row.id}`}>
                    <Button className={styles.viewBtn} variant="outlined">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
