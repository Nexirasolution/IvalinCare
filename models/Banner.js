import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", trim: true },
    subtitle: { type: String, default: "" },
    image: {
      url: { type: String, required: [true, "Banner image is required."], trim: true },
      publicId: { type: String, default: "" },
    },
    ctaText: { type: String, default: "" },
    ctaLink: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);