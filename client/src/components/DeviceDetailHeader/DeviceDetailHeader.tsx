import React from "react";
import { Device } from "../../schema/Device";
import styles from "./DeviceDetailHeader.module.css";
import { DEVICESTATUS } from "../../schema/enums";
import storageImg from "../../assets/storage.png";
import speedTestImg from "../../assets/speedtest.png";
import logsImg from "../../assets/logs.png";
import { Button } from "@mui/material";

interface DeviceDetailHeaderProps {
  data?: Device;
}

export const DeviceDetailHeader = ({ data }: DeviceDetailHeaderProps) => {
  return (
    <div className={styles.deviceDetailHeader}>
      <div className={styles.titleContainer}>
        <h1>{data?.serialNo}</h1>
        <div>
          <Button>
            <img alt={"icon"} src={speedTestImg} /> Speedtest
          </Button>
          <Button>
            <img alt={"icon"} src={logsImg} /> Logs
          </Button>
        </div>
      </div>
      <div>
        <h6 style={{ fontSize: "14px" }}>{data?.theatreName}</h6>
        <p style={{ color: "#69788C", fontSize: "12px" }}>
          {data?.location?.city +
            ", " +
            data?.location?.state +
            ", " +
            data?.location?.country}
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            borderBottom: "2px solid #F5F8FA",
            paddingBottom: "10px",
          }}
        >
          <div className={styles.deviceStatusContainer}>
            <div
              className={styles.deviceStatus}
              style={{
                backgroundColor:
                  data?.deviceStatus === DEVICESTATUS.Online ? "green" : "red",
              }}
            ></div>
            {data?.deviceStatus}
          </div>
          <div
            className={`${styles.deviceStatusContainer} ${styles.deviceStorageContainer}`}
          >
            <img alt={"icon"} src={storageImg} />
            {data?.storage}
          </div>
        </div>
        <div className={styles.dummyTabs}>
          <span>Details</span>
          <span>Content</span>
          <span>Bandwidth</span>
        </div>
      </div>
    </div>
  );
};
