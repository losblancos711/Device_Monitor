import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { KeyboardArrowRight } from "@mui/icons-material";

interface Breadcrumb {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  serialNo?: string;
}

export const Breadcrumbs = ({ serialNo }: BreadcrumbsProps) => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const pathname = location.pathname;
    const paths = pathname.split("/").filter((p) => p);
    const breadcrumbs = paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        name: path,
        url: url,
      };
    });
    setBreadcrumbs(breadcrumbs);
  }, [location.pathname]);

  return (
    <nav>
      <ul className={styles.breadcrumbList}>
        {breadcrumbs.map((breadcrumb, i) => (
          <li key={i}>
            {i === breadcrumbs.length - 1 ? (
              serialNo
            ) : (
              <Link to={breadcrumb.url}>
                {breadcrumb.name} <KeyboardArrowRight fontSize={"small"} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
