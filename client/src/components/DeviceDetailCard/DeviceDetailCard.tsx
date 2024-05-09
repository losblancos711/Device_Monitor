import React from "react";
import { Device } from "../../schema/Device";
import styles from "./DeviceDetailCard.module.css";

interface DeviceDetailCardProps {
  data?: Device;
}

export const DeviceDetailCard = ({ data }: DeviceDetailCardProps) => {
  return (
    <div className={styles.dataCard}>
      <div className={styles.dataCol}>
        <h6>Device Serial</h6>
        <p>{data?.serialNo}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Location</h6>
        <p>{data?.theatreName}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>City</h6>
        <p>
          {data?.location?.city +
            ", " +
            data?.location?.state +
            ", " +
            data?.location?.country}
        </p>
      </div>
      <div className={styles.dataCol}>
        <h6>ISP Payment Responsibility</h6>
        <p>{data?.ispPaymentResponsibility}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Bandwidth</h6>
        <p>{data?.bandwidth}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Average Bandwidth</h6>
        <p>{data?.avgBandwidth}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Plan Start Date</h6>
        <p>
          {data?.planStartDate
            ? new Date(data?.planStartDate).toDateString()
            : ""}
        </p>
      </div>
      <div className={styles.dataCol}>
        <h6>Billing Cycle</h6>
        <p>{data?.billingCycle}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Download Status</h6>
        <p>{data?.downloadStatus}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>OS Version</h6>
        <p>{data?.osVersion}</p>
      </div>
      <div className={styles.dataCol}>
        <h6>Storage Available</h6>
        <p>{data?.storage}</p>
      </div>
    </div>
  );
};
