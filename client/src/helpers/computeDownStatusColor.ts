import { DOWNLOADSTATUS } from "../schema/enums";

export const computeDownStatusColor = (
  status?: DOWNLOADSTATUS | string
): string => {
  let statusColor = "grey";
  switch (status?.toLowerCase()) {
    case DOWNLOADSTATUS.CANC:
      statusColor = "gold";
      break;
    case DOWNLOADSTATUS.DOWN:
      statusColor = "#084782";
      break;
    case DOWNLOADSTATUS.FAIL:
      statusColor = "red";
      break;
    case DOWNLOADSTATUS.SCHE:
      statusColor = "grey";
      break;
    case DOWNLOADSTATUS.DOWND:
      statusColor = "green";
      break;
    default:
      break;
  }
  return statusColor;
};
