import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.cloud_name || "dazeowi1e",
    api_key: process.env.cloud_api_key || 526195622519846,
    api_secret: process.env.cloud_api_secret || "WxMlfs7E9C_MxTkmasSN1Ll7niw",
});
console.log("Cloudinary Config:", {
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret,
});

export default cloudinary;