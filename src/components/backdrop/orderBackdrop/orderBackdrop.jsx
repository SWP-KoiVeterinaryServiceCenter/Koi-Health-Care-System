import { tokens } from "../../../theme";
import {
  FormatDate,
  FormatVietnamHour,
  FormatVietnamTime,
} from "../../format/formatDatetime/formatDatetime";
import { TruncateText } from "../../format/formatText/formatText";
import { Backdrop, Box, Divider, Grid, useTheme } from "@mui/material";
import Coin from "../../../assets/coin.png";
import NoBackground from "../../../assets/noBackground.png";

export default function OrderBackdrop(props) {
  const orderDetail = props.orderDetail;
  const open = props.open;
  const handleClose = props.handleClose;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(orderDetail);

  const totalPrice = orderDetail.products?.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  const orderDuration =
    FormatVietnamHour(orderDetail.endTime) -
    FormatVietnamHour(orderDetail.startTime);

  const getOrderStatusColor = () => {
    switch (orderDetail.orderStatus) {
      case "Pending":
        return "#f0c674"; // Màu vàng
      case "Delivered":
        return "#70d8bd"; // Màu xanh lá
        case "Confirm":
            return "#00504B"; // Màu xanh lá
      case "Reject":
        return colors.redAccent[600]; // Màu đỏ
      case "Cancelled":
        return "#1a73e8"; // Màu xanh đậm
      default:
        return "#ffffff"; // Mặc định là màu trắng
    }
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={handleClose}
    >
      <Box sx={style}>
        <div className="accountBackdrop">
          <div className="flex-column">
            <div className="text" style={{ color: colors.greenAccent[500] }}>
              ID:{orderDetail.orderId}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={orderDetail.post?.product?.productImageUrl || NoBackground}
              alt=""
              className="background"
            />
          </div>

          <div className="flex-column"></div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Post Title:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {orderDetail.post?.postTitle}
                </h>
              </div>
            </div>

            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Condition Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {orderDetail.post?.product?.conditionName}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Category Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {orderDetail.post?.product?.categoryName}
                </h>
              </div>
            </div>
          </div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
              <div
                className="role"
                style={{
                  color: getOrderStatusColor(),
                }}
              >
                {orderDetail.orderStatus}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Backdrop>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  minWidth: "593px",
};
