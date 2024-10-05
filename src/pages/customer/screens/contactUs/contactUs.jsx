import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"; // Thay thế MKBox bằng Box
import Input from "@mui/material/Input"; // Thay thế MKInput bằng Input
import Button from "@mui/material/Button"; // Thay thế MKButton bằng Button
import Typography from "@mui/material/Typography"; // Giữ lại MKTypography vì không có thay thế trực tiếp

import bgImage from "../../../../assets/contactbg.jpg";

function ContactUs() {
  return (
    <>
      <Grid container spacing={3} alignItems="center" marginTop={10}>
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: "none", lg: "flex" }}
            width="100%" // Đặt chiều rộng thành 100% 
            height="800px" // Đặt chiều cao cụ thể
            borderRadius="16px" // Tăng độ bo tròn
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Thêm backgroundSize và backgroundPosition
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <Box
            bgcolor="white"
            borderRadius="16px" // Tăng độ bo tròn
            boxShadow={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <Box bgcolor="info.main" borderRadius="16px" p={2} mx={2} mt={-3}>
              <Typography variant="h3" color="white">
                Contact us
              </Typography>
            </Box>
            <Box p={3}>
              <Typography variant="body2" color="text.primary" mb={3}>
                For further questions, including partnership opportunities,
                please email hello@creative-tim.com or contact using our contact
                form.
              </Typography>
              <Box
                width="100%"
                component="form"
                method="post"
                autoComplete="off"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Input
                      variant="standard"
                      placeholder="Full Name"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      type="email"
                      variant="standard"
                      placeholder="Email"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      variant="standard"
                      placeholder="What can we help you?"
                      fullWidth
                      multiline
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  justifyContent="center"
                  xs={12}
                  mt={5}
                  mb={2}
                >
                  <Button variant="contained" color="info">
                    Send Message
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactUs;