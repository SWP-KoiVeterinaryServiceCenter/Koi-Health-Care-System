import React from "react";
import { Backdrop, Box, Divider, useTheme } from "@mui/material";
import { FormatPhoneNumber } from "../../format/formatText/formatText";
import { AccRole, ShopStatus, PetType } from "../../mapping/mapping";
import { tokens } from "../../../theme";
import NoBackground from "../../../assets/noBackground.png";
import NoAvatar from "../../../assets/noAvatar.png";


export function ReportPostBackdrop({ open, handleClose, reportPostDetail }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Box sx={style}>
        <div className="shopBackdrop">
          <div className="flex-column">
            <div className="text" style={{ color: colors.greenAccent[500] }}>
              ID:{reportPostDetail.id}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={reportPostDetail.postDetail?.productImageUrl || NoBackground}
              alt=""
              className="background"
            />
          </div>

          <div className="flex-column"></div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Report Content:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportPostDetail.reportContent}
                </h>
              </div>
            </div>

            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Name Post:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                {reportPostDetail.postDetail?.postTitle}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Type:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                {reportPostDetail.postDetail?.conditionTypeName}
                </h>
              </div>
            </div>
           
            <Divider color={colors.greenAccent[500]} />
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Author Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportPostDetail.postDetail?.postAuthor?.fulName}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Email:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportPostDetail.postDetail?.postAuthor?.email}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Phone Number:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportPostDetail.postDetail?.postAuthor?.phoneNumber}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Create Day:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportPostDetail.postDetail?.postAuthor?.createdDate}
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
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
