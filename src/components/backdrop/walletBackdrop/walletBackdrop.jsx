import React from "react";
import { Backdrop, Box, Divider, useTheme } from "@mui/material";
import { FormatPhoneNumber } from "../../format/formatText/formatText";
import {
  AccRole,
  ShopStatus,
  PetType,
} from "../../mapping/mapping";
import { tokens } from "../../../theme";
import NoBackground from "../../../assets/noBackground.png";
import NoAvatar from "../../../assets/noAvatar.png";


export function WalletBackdrop({ open, handleClose, walletDetail }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <Box sx={style}>
        <div className="accountBackdrop">
    
       
          <div className="flex-column">
            
          
         
          </div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Email
              </div>
              <div className="text">{walletDetail.email}</div>
            </div>
            <div className="flex-column">
              <div className="text" style={{ color: colors.greenAccent[500] }}>
                Name
              </div>
              <div className="text">{walletDetail.userName}</div>
            </div>
          </div>
          <Divider color={colors.greenAccent[500]} />
          <div className="flex-row">
            <div className="flex-column">
             
              <div  className="role"
                        style={{
                            color: "#70d8bd",
                        }}>{walletDetail.roleName}</div>
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
