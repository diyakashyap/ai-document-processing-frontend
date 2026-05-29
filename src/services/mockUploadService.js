export function createMockUploadRecords(files, email) {
  return Array.from(files).map((file, index) => ({
    id: `new-${Date.now()}-${index}`,
    fileName: file.name,
    email,
    uploadedAt: new Date().toISOString(),
    size: file.size,
    status: index === 0 ? "Uploaded" : "Processing",
    retryAvailable: false,
    summaryPreview:
      "This file has been accepted by the frontend and is ready for backend text extraction and summary processing.",
    summaryText:
      "Mock summary placeholder. Backend will extract text first, then send extracted text to Amazon Bedrock/Nova Micro.",
  }));
}
