import { useState } from "react";
import FileDropzone from "../components/upload/FileDropzone.jsx";
import { validateUploadRequest } from "../utils/fileValidation.js";

export default function UploadWorkspace({ 
  onUploadAccepted,
  summary,
}) {
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const validation = validateUploadRequest(files, email);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setSuccessMessage("");
      return;
    }

    setErrors([]);
    onUploadAccepted(files, email);
    setSuccessMessage(
      "Files uploaded successfully. Processing will be handled by Amazon Bedrock after backend integration."
    );
    setFiles([]);
  }

  return (
    <div className="two-column">
      <section className="content-panel">
        <div className="panel-heading">
          <div>
            <h2>Upload documents</h2>
          </div>
        </div>
        <form className="upload-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="email">
            <span>
              Email id <span className="required-mark">*</span>
            </span>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <FileDropzone files={files} onFilesChange={setFiles} />

          {errors.length > 0 && (
            <div className="error-box" role="alert">
              {errors.map((error) => (
                <span key={error}>{error}</span>
              ))}
            </div>
          )}

          {successMessage && (
            <div className="success-box" role="status">
              {successMessage}
            </div>
          )}

          <button type="submit" className="primary-button">
            Upload files
          </button>
        </form>
            </section>

      <section className="content-panel">
        <div className="panel-heading">
          <div>
            <h2>Generated Summary</h2>
          </div>
        </div>


        

        <div className="summary-placeholder">
          {summary ? (
            <p>{summary}</p>
          ) : (
            "Upload a document to view its summary here."
          )}
        </div>
      </section>
    </div>
  );
}
