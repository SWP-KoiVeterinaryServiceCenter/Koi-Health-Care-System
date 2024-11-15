// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import Chip from "@mui/material/Chip";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
// import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
// import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
// import mobileIntegrationImage from "../../../../../assets/fishh.png"; // Replace with actual path
// import dashboardImage from "../../../../../assets/fish.png"; // Replace with actual path
// import platformsImage from "../../../../../assets/doctorlp.jpg"; // Replace with actual path
// const items = [
//   {
//     icon: <DevicesRoundedIcon />,
//     title: "Bác sĩ cho cá",
//     description:
//       "Đội ngũ bác sĩ thú y chuyên nghiệp, giàu kinh nghiệm trong lĩnh vực chăm sóc cá Koi, luôn sẵn sàng hỗ trợ bạn với các giải pháp y tế tối ưu cho cá của mình.",
//     imageLight: `url(${platformsImage})`,
//     imageDark: `url(${platformsImage})`,
//     // imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
//     // imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
//   },
//   {
//     icon: <ViewQuiltRoundedIcon />,
//     title: "Tư vấn ",
//     description:
//       "Chúng tôi cung cấp dịch vụ tư vấn chuyên sâu về chăm sóc và quản lý sức khỏe cá Koi, giúp bạn duy trì môi trường sống tối ưu và phòng ngừa các bệnh tiềm ẩn.",
//     imageLight: `url(${dashboardImage})`,
//     imageDark: `url(${dashboardImage})`,
//     // imageLight: 'url("https://assets.materialup.com/uploads/a6d53b53-9e7b-4206-9ae8-5340f4c7d22b/preview.jpg")',
//     // imageDark: 'url("https://assets.materialup.com/uploads/a6d53b53-9e7b-4206-9ae8-5340f4c7d22b/preview.jpg")',
//   },
//   {
//     icon: <EdgesensorHighRoundedIcon />,
//     title: "Điều trị",
//     description:
//       "Với các phương pháp điều trị hiện đại và an toàn, chúng tôi đảm bảo điều trị hiệu quả các bệnh lý thường gặp ở cá Koi, giúp cá hồi phục nhanh chóng và khỏe mạnh.",
//     imageLight: `url(${mobileIntegrationImage})`,
//     imageDark: `url(${mobileIntegrationImage})`,
//     // imageLight: 'url("https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/dd/39/13/dd3913a3-04d4-dba1-7331-4fb23a13c93e/pr_source.jpg/750x750bb.jpeg")',
//     // imageDark: 'url("https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/dd/39/13/dd3913a3-04d4-dba1-7331-4fb23a13c93e/pr_source.jpg/750x750bb.jpeg")',
//   },
  
// ];

// export default function Features() {
//   const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

//   const handleItemClick = (index) => {
//     setSelectedItemIndex(index);
//   };

//   const selectedFeature = items[selectedItemIndex];

//   return (
//     <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={6}>
//           <div>
//             <Typography component="h2" variant="h4" color="text.primary">
//               Dịch Vụ
//             </Typography>
//             <Typography
//               variant="body1"
//               color="text.secondary"
//               sx={{ mb: { xs: 2, sm: 4 } }}
//             >
//               Tại đây, bạn có thể được cung cấp tổng quan ngắn gọn về các tính
//               năng chính của sản phẩm.
//             </Typography>
//           </div>
//           <Grid
//             container
//             item
//             gap={1}
//             sx={{ display: { xs: "auto", sm: "none" } }}
//           >
//             {items.map(({ title }, index) => (
//               <Chip
//                 key={index}
//                 label={title}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   borderColor: (theme) => {
//                     if (theme.palette.mode === "light") {
//                       return selectedItemIndex === index ? "primary.light" : "";
//                     }
//                     return selectedItemIndex === index ? "primary.light" : "";
//                   },
//                   background: (theme) => {
//                     if (theme.palette.mode === "light") {
//                       return selectedItemIndex === index ? "none" : "";
//                     }
//                     return selectedItemIndex === index ? "none" : "";
//                   },
//                   backgroundColor:
//                     selectedItemIndex === index ? "primary.main" : "",
//                   "& .MuiChip-label": {
//                     color: selectedItemIndex === index ? "#fff" : "",
//                   },
//                 }}
//               />
//             ))}
//           </Grid>
//           <Box
//             component={Card}
//             variant="outlined"
//             sx={{
//               display: { xs: "auto", sm: "none" },
//               mt: 4,
//             }}
//           >
//             <Box
//               className="edit-img"
//               sx={{
//                 backgroundSize: "contain", // Use 'contain' to ensure the whole image is visible
//                 backgroundPosition: "center",
//                 backgroundImage: (theme) =>
//                   theme.palette.mode === "light"
//                     ? items[selectedItemIndex].imageLight
//                     : items[selectedItemIndex].imageDark,
//                 backgroundRepeat: "no-repeat", // Ensure no repeat
//                 minHeight: 280,
//                 width: "100%", // Ensure it takes full width
//               }}
//             />
//             <Box sx={{ px: 2, pb: 2 }}>
//               <Typography
//                 color="text.primary"
//                 variant="body2"
//                 fontWeight="bold"
//               >
//                 {selectedFeature.title}
//               </Typography>
//               <Typography
//                 color="text.secondary"
//                 variant="body2"
//                 sx={{ my: 0.5 }}
//               >
//                 {selectedFeature.description}
//               </Typography>
//               <Link
//                 color="primary"
//                 variant="body2"
//                 fontWeight="bold"
//                 sx={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   "& > svg": { transition: "0.2s" },
//                   "&:hover > svg": { transform: "translateX(2px)" },
//                 }}
//               >
//                 <span>Learn more</span>
//                 <ChevronRightRoundedIcon
//                   fontSize="small"
//                   sx={{ mt: "1px", ml: "2px" }}
//                 />
//               </Link>
//             </Box>
//           </Box>
//           <Stack
//             direction="column"
//             justifyContent="center"
//             alignItems="flex-start"
//             spacing={2}
//             useFlexGap
//             sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
//           >
//             {items.map(({ icon, title, description }, index) => (
//               <Card
//                 key={index}
//                 variant="outlined"
//                 component={Button}
//                 onClick={() => handleItemClick(index)}
//                 sx={{
//                   p: 3,
//                   height: "fit-content",
//                   width: "100%",
//                   background: "none",
//                   backgroundColor:
//                     selectedItemIndex === index ? "action.selected" : undefined,
//                   borderColor: (theme) => {
//                     if (theme.palette.mode === "light") {
//                       return selectedItemIndex === index
//                         ? "primary.light"
//                         : "grey.200";
//                     }
//                     return selectedItemIndex === index
//                       ? "primary.dark"
//                       : "grey.800";
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: "100%",
//                     display: "flex",
//                     textAlign: "left",
//                     flexDirection: { xs: "column", md: "row" },
//                     alignItems: { md: "center" },
//                     gap: 2.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       color: (theme) => {
//                         if (theme.palette.mode === "light") {
//                           return selectedItemIndex === index
//                             ? "primary.main"
//                             : "grey.300";
//                         }
//                         return selectedItemIndex === index
//                           ? "primary.main"
//                           : "grey.700";
//                       },
//                     }}
//                   >
//                     {icon}
//                   </Box>
//                   <Box sx={{ textTransform: "none" }}>
//                     <Typography
//                       color="text.primary"
//                       variant="body2"
//                       fontWeight="bold"
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       color="text.secondary"
//                       variant="body2"
//                       sx={{ my: 0.5 }}
//                     >
//                       {description}
//                     </Typography>
//                     <Link
//                       color="primary"
//                       variant="body2"
//                       fontWeight="bold"
//                       sx={{
//                         display: "inline-flex",
//                         alignItems: "center",
//                         "& > svg": { transition: "0.2s" },
//                         "&:hover > svg": { transform: "translateX(2px)" },
//                       }}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     >
//                       <span>Learn more</span>
//                       <ChevronRightRoundedIcon
//                         fontSize="small"
//                         sx={{ mt: "1px", ml: "2px" }}
//                       />
//                     </Link>
//                   </Box>
//                 </Box>
//               </Card>
//             ))}
//           </Stack>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
//         >
//           <Card
//             variant="outlined"
//             sx={{
//               height: "100%",
//               width: "100%",
//               display: { xs: "none", sm: "flex" },
//               pointerEvents: "none",
//             }}
//           >
//             <Box
//               sx={{
//                 m: "auto",
//                 width: "100%", // Ensure it takes full width
//                 height: "100%", // Ensure it takes full height
//                 backgroundSize: "contain", // Adjust size to fit container
//                 backgroundImage: (theme) =>
//                   theme.palette.mode === "light"
//                     ? items[selectedItemIndex].imageLight
//                     : items[selectedItemIndex].imageDark,
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat", // Ensure no repeat
//               }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import mobileIntegrationImage from "../../../../../assets/fishh.png"; // Replace with actual path
import dashboardImage from "../../../../../assets/fish.png"; // Replace with actual path
import platformsImage from "../../../../../assets/doctorlp.jpg"; // Replace with actual path

const items = [
  {
    icon: <DevicesRoundedIcon />,
    title: "Fish Doctor",
    description:
      "Our professional and experienced veterinary team specializing in Koi fish care is always ready to support you with the best medical solutions for your fish.",
    imageLight: `url(${platformsImage})`,
    imageDark: `url(${platformsImage})`,
  },
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Consultation",
    description:
      "We offer in-depth consultation services for Koi fish care and health management, helping you maintain the optimal environment and prevent potential diseases.",
    imageLight: `url(${dashboardImage})`,
    imageDark: `url(${dashboardImage})`,
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Treatment",
    description:
      "With modern and safe treatment methods, we ensure effective treatment for common Koi fish diseases, helping the fish recover quickly and stay healthy.",
    imageLight: `url(${mobileIntegrationImage})`,
    imageDark: `url(${mobileIntegrationImage})`,
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Services
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here, you can find a brief overview of the main features of the product.
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "primary.light" : "";
                    }
                    return selectedItemIndex === index ? "primary.light" : "";
                  },
                  background: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "none" : "";
                    }
                    return selectedItemIndex === index ? "none" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              className="edit-img"
              sx={{
                backgroundSize: "contain", 
                backgroundPosition: "center",
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundRepeat: "no-repeat",
                minHeight: 280,
                width: "100%", 
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
              <Link
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  "& > svg": { transition: "0.2s" },
                  "&:hover > svg": { transform: "translateX(2px)" },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize="small"
                  sx={{ mt: "1px", ml: "2px" }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index
                        ? "primary.light"
                        : "grey.200";
                    }
                    return selectedItemIndex === index
                      ? "primary.dark"
                      : "grey.800";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.300";
                        }
                        return selectedItemIndex === index
                          ? "primary.main"
                          : "grey.700";
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: "none" }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: "1px", ml: "2px" }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                m: "auto",
                width: "100%", 
                height: "100%", 
                backgroundSize: "contain",
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
