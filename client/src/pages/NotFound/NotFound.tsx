import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div className="text-center font-bold text-4xl">404 Not Found</div>
      <Link to={"/devices"}>
        <Button variant="outlined">Go Back</Button>
      </Link>
    </>
  );
};
