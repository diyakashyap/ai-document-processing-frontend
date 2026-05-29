import { uploadRules } from "../config/uploadRules.js";

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getFileExtension(fileName) {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts.pop() : "";
}

export function validateUploadRequest(files, email) {
  const errors = [];
  const fileList = Array.from(files);
  const maxBytes = uploadRules.maxFileSizeMb * 1024 * 1024;

  if (!validateEmail(email)) {
    errors.push("A valid email id is required before upload.");
  }

  if (!fileList.length) {
    errors.push("Select at least one file to upload.");
  }

  if (fileList.length > uploadRules.maxFiles) {
    errors.push(`Maximum ${uploadRules.maxFiles} files are allowed per upload request.`);
  }

  fileList.forEach((file) => {
    const extension = getFileExtension(file.name);
    const hasAcceptedExtension = uploadRules.acceptedExtensions.includes(extension);
    const hasAcceptedMimeType = uploadRules.acceptedMimeTypes.includes(file.type) || !file.type;

    if (!hasAcceptedExtension || !hasAcceptedMimeType) {
      errors.push(`${file.name} is not a supported file type.`);
    }

    if (file.size > maxBytes) {
      errors.push(`${file.name} exceeds the ${uploadRules.maxFileSizeMb} MB file size limit.`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
