# AI Document Processing Frontend

Frontend-only enterprise React application for document upload validation, mock processing status,
summary history, retry handling, and future API connection.

## Included

- Professional responsive UI
- Upload workspace and history pages
- Mock upload and summary records
- Mandatory email validation
- Maximum 3 files per upload request
- Supported file types: PDF, PNG, JPG, JPEG, TXT
- Maximum file size: 5 MB per file
- Statuses: Uploaded, Processing, Completed, Failed
- One retry action for failed processing
- Separate mock downloads for file and summary TXT
- API boundary files ready for backend integration later

## Not included

- Backend integration
- GitHub Actions
- Real AI processing
- Real permanent storage

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

Deploy the generated `dist` folder to your static hosting provider.

## Future backend connection points

Update `src/services/apiClient.js` when your backend endpoints are ready:

- `uploadDocuments`
- `fetchSummaryHistory`
- `retrySummaryProcessing`
