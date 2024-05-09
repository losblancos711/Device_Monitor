import React, { useEffect, useState } from "react";
import { Device } from "../../schema/Device";
import { BASE_URL } from "../../api/url";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import styles from "./DeviceDetail.module.css";
import { DeviceDetailHeader } from "../../components/DeviceDetailHeader/DeviceDetailHeader";
import { DeviceDetailCard } from "../../components/DeviceDetailCard/DeviceDetailCard";
import { Breadcrumbs } from "../../components/Breadcrumb/Breadcrumbs";

export const DeviceDetail = () => {
  const params = useParams();
  const [data, setData] = useState<Device>();
  const [loading, setLoading] = useState(true);

  // Fetching data
  const fetchAppliances = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/appliances/${params?.id}/info`
      );
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
    <div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Breadcrumbs serialNo={data?.serialNo} />
          <DeviceDetailHeader data={data} />
          <DeviceDetailCard data={data} />
        </div>
      )}
    </div>
  );
};
