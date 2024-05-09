import React, { useEffect, useState } from "react";
import styles from "./Devices.module.css";
import { Device } from "../../schema/Device";
import { DevicesTable } from "../../components/DevicesTable/DevicesTable";
import { BASE_URL } from "../../api/url";
import { CircularProgress } from "@mui/material";
import { DeviceMonitor } from "../../components/DeviceMonitor/DeviceMonitor";

export interface DeviceMonitor {
  failed?: number;
  cancelled?: number;
  downloading?: number;
  downloaded?: number;
  scheduled?: number;
}

export const Devices = () => {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching data
  const fetchAppliances = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/appliances`);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching appliances:", error);
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  return (
    <>
      <div className={`bg-white ${styles.header}`}>
        <h4>Devices</h4>
      </div>
      <DeviceMonitor data={data} />
      <div>
        {loading ? (
          <div className={styles.loaderContainer}>
            <CircularProgress />
          </div>
        ) : (
          <DevicesTable tableData={data} />
        )}
      </div>
    </>
  );
};
