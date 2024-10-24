import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import sidebarBg from "../../assets/bg4_sidebar.jpg"; // Đường dẫn đến hình ảnh

export const StyledSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return {
        "& .pro-sidebar-inner": {
            background: `${colors.primary[900]} url(${sidebarBg}) no-repeat center center`,
            backgroundSize: "cover", // Giúp hình ảnh phủ toàn bộ sidebar
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
            transition: "background-color 0.3s, color 0.3s", // Thêm hiệu ứng chuyển tiếp
            // color: "#000000 !important", // Đổi màu chữ thành màu đen
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
