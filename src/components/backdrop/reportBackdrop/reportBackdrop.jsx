import React from "react";
import { Backdrop, Box, Divider, useTheme } from "@mui/material";
import { FormatPhoneNumber } from "../../format/formatText/formatText";
import { AccRole, ShopStatus, PetType } from "../../mapping/mapping";
import { tokens } from "../../../theme";
import NoBackground from "../../../assets/noBackground.png";
import NoAvatar from "../../../assets/noAvatar.png";


export function ReportUserBackdrop({ open, handleClose, reportUserDetail }) {
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
              ID:{reportUserDetail.id}
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src={reportUserDetail.user?.authorImage || NoBackground}
              alt=""
              className="background"
            />
          </div>

          <div className="flex-column"></div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Full Name:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportUserDetail.user?.fulName}
                </h>
              </div>
            </div>

            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Email:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                {reportUserDetail.user?.email}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                PhoneNumber:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                {reportUserDetail.user?.phoneNumber}
                </h>
              </div>
            </div>
           
            <Divider color={colors.greenAccent[500]} />
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Author ID:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportUserDetail.user?.authorId}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Create Day:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportUserDetail.user?.createdDate}
                </h>
              </div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Rating:{" "}
                <h style={{ color: colors.greenAccent[100] }}>
                  {reportUserDetail.user?.rating}      
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
