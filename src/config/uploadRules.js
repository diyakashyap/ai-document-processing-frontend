export const uploadRules = {
  maxFiles: 3,
  maxFileSizeMb: 5,
  acceptedExtensions: ["pdf", "png", "jpg", "jpeg", "txt"],
  acceptedMimeTypes: [
    "application/pdf",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "text/plain",
  ],
  retryAttempts: 1,
};

export const uploadHelpText = "Upload PDF, PNG, JPG, JPEG, TXT files only";
