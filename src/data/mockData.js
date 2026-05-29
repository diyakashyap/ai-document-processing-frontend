export const mockSummaryHistory = [
  {
    id: "sum-1001",
    fileName: "vendor-contract-review.pdf",
    email: "operations@example.com",
    uploadedAt: "2026-05-24T09:45:00.000Z",
    size: 1860000,
    status: "Completed",
    retryAvailable: false,
    summaryPreview:
      "The agreement covers vendor onboarding, service timelines, confidentiality obligations, and a 30-day termination clause.",
    summaryText:
      "The agreement covers vendor onboarding, service timelines, confidentiality obligations, and a 30-day termination clause. Key actions include validating renewal dates and confirming data handling responsibilities.",
  },
  {
    id: "sum-1002",
    fileName: "invoice-batch-may.png",
    email: "finance@example.com",
    uploadedAt: "2026-05-20T13:20:00.000Z",
    size: 942000,
    status: "Completed",
    retryAvailable: false,
    summaryPreview:
      "The image appears to include invoice totals, tax details, and payment references for the May billing cycle.",
    summaryText:
      "The image appears to include invoice totals, tax details, and payment references for the May billing cycle. Review totals against purchase orders before approval.",
  },
  {
    id: "sum-1003",
    fileName: "client-notes.txt",
    email: "success@example.com",
    uploadedAt: "2026-05-08T16:10:00.000Z",
    size: 22000,
    status: "Processing",
    retryAvailable: false,
    summaryPreview: "Processing is in progress. The summary preview will be available shortly.",
    summaryText: "",
  },
  {
    id: "sum-1004",
    fileName: "legacy-policy.pdf",
    email: "risk@example.com",
    uploadedAt: "2026-04-18T08:30:00.000Z",
    size: 4120000,
    status: "Failed",
    retryAvailable: true,
    summaryPreview:
      "Processing failed during text extraction. One retry is available for this file.",
    summaryText: "",
  },
  {
    id: "sum-1005",
    fileName: "audit-evidence.jpeg",
    email: "audit@example.com",
    uploadedAt: "2026-03-14T11:05:00.000Z",
    size: 1380000,
    status: "Completed",
    retryAvailable: false,
    summaryPreview:
      "The image contains audit evidence labels, timestamped approvals, and supporting document references.",
    summaryText:
      "The image contains audit evidence labels, timestamped approvals, and supporting document references. Store alongside the related audit workpaper.",
  },
];
