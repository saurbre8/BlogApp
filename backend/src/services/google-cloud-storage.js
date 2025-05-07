const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "sonorous-haven-431210-v0",
  keyFilename: "./gcp_key.json",
});

const uploadToGoogleCloudStorage = async (filepath) => {
  try {
    const gcs = storage.bucket("gs://ix-blog-app-bs");
    const storagepath = `ix-blog-app-bs/${filepath}`;

    const result = await gcs.upload(filepath, {
      destination: storagepath,
      public: true,
      metadata: {
        contentType: "application/plain", //application/csv for excel or csv file upload
      },
    });
    return result[0].metadata.mediaLink;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const GoogleCloudService = {
  uploadToGoogleCloudStorage,
};

module.exports = GoogleCloudService;
