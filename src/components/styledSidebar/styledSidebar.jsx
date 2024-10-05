import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export const StyledSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return {
        "& .pro-sidebar-inner": {
            background: `${colors.primary[900]} !important`,
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            transition: "background-color 0.3s, color 0.3s", // Thêm hiệu ứng chuyển tiếp
        },
        "& .pro-inner-item:hover": {
            backgroundColor: "rgba(200, 200, 200, 0.5) !important", // Màu nền xám nhạt khi hover
            color: "#00504B !important", // Đổi màu chữ thành màu được chỉ định khi hover
        },
        "& .pro-menu-item.active": {
            backgroundColor: "rgba(200, 200, 200, 0.5) !important", // Màu nền xám nhạt khi item được chọn
            color: "#00504B !important", // Đổi màu chữ thành màu được chỉ định khi item được chọn
        },
    };
};
