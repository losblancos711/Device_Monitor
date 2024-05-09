import React, { useEffect } from "react";
import { Device } from "../../schema/Device";
import { DOWNLOADSTATUS } from "../../schema/enums";
import { computeDownStatusColor } from "../../helpers/computeDownStatusColor";
import { useStore } from "../../store/store";
import styles from "./DeviceMonitor.module.css";

interface DeviceMonitorProps {
  data?: Device[];
}

export const DeviceMonitor = ({ data }: DeviceMonitorProps) => {
  const { meta, upsertMetaData } = useStore();

  const allDownloadStatus = [
    DOWNLOADSTATUS.CANC,
    DOWNLOADSTATUS.DOWN,
    DOWNLOADSTATUS.DOWND,
    DOWNLOADSTATUS.FAIL,
    DOWNLOADSTATUS.SCHE,
  ];

  // counting download status
  const computeStatusCount = (data?: Device[]) => {
    const statusCount = { ...meta }; // Create a copy of meta

    data?.forEach((d) => {
      let status = d?.downloadStatus?.toLowerCase();
      if (status) {
        statusCount[status] = (statusCount[status] || 0) + 1; // Update the count
      }
    });

    upsertMetaData("statusCount", statusCount); // Update meta in the store
  };

  useEffect(() => {
    computeStatusCount(data);
  }, [data]);

  return (
    <div className={`${styles.statusBar}`}>
      <div>
        <div className={`${styles.statusBarContent}`}>
          {allDownloadStatus?.map((ds, j) => {
            return (
              <div
                key={j}
                style={{ fontSize: "14px", textTransform: "capitalize" }}
              >
                <div
                  style={{
                    backgroundColor: computeDownStatusColor(ds),
                    width: "8px",
                    height: "8px",
                    borderRadius: "3px",
                    marginRight: "12px",
                    display: "inline-block",
                    fontSize: "14px",
                  }}
                ></div>
                <span style={{ fontSize: "12px", marginRight: "5px" }}>
                  {meta?.statusCount?.[ds]}
                </span>
                {ds}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
