import { Dropbox } from "dropbox";

const refreshToken = process.env.DBX_REFRESH_TOKEN;
const clientId = process.env.DBX_APP_KEY;
const clientSecret = process.env.DBX_APP_SECRET;

const dbx = new Dropbox({
  refreshToken,
  clientId,
  clientSecret,
  fetch,
});

export default dbx;

export const uploadFile = async (file: File) => {
  const extension = file.name.split(".").pop();
  const response = await dbx.filesUpload({
    path: `/${Date.now()}.${extension}`,
    contents: file,
  });

  const path = response.result.path_lower;

  if (path) {
    const url = await getSharedLink(path);
    return { url, path };
  }

  return undefined;
};

export const getSharedLink = async (file_path: string) => {
  try {
    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: file_path,
    });
    const url = sharedLinkResponse.result.url.replace("dl=0", "raw=1");
    return url;
  } catch (error) {
    console.error("Error creating shared link:", error);
  }
};

export const deleteFile = async (file_path: string) => {
  return await dbx.filesDeleteV2({
    path: file_path,
  });
};
