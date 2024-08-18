import "./shopBackdrop.css";
import { Backdrop, Box, useTheme,Divider  } from "@mui/material";
import {
  FormatTime,
  FormatTimeDifference,
} from "../../../components/format/formatDatetime/formatDatetime";
import { FormatPhoneNumber } from "../../../components/format/formatText/formatText";
import { PetType, ShopStatus } from "../../../components/mapping/mapping";
import { tokens } from "../../../theme";
import NoBackground from "../../../assets/noBackground.png"

export function ShopBackdrop(props) {
  const open = props.open;
  const handleClose = props.handleClose;
  const shopDetail = props.shopDetail;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <div className="shopBackdrop">
          <div className="flex-column">
            <div className="text" style={{ color: colors.greenAccent[500] }}>
              ID:{shopDetail.postId}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={shopDetail.productImageUrl || NoBackground}
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
                  {shopDetail.postTitle}
                </h>
              </div>
            </div>

            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Condition Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {shopDetail.conditionTypeName}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Category Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {shopDetail.categoryName}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Create Day:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {shopDetail.postAuthor?.createdDate}
                </h>
              </div>
            </div>
            <Divider color={colors.greenAccent[500]} />
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Author:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {shopDetail.postAuthor?.fulName}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Email:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {shopDetail.postAuthor?.email}
                </h>
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
  minWidth: 759.2,
};
