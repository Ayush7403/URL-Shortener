import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  const { data } = await axiosInstance.post("/api/create", {
    full_url: url,
    ...(slug && { custom_slug: slug }), // add only if slug exists
  });
  return data.shortUrl;
};
