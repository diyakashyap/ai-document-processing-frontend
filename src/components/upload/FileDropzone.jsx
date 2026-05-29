import { uploadHelpText } from "../../config/uploadRules.js";
import { formatBytes } from "../../utils/formatters.js";

export default function FileDropzone({ files, onFilesChange }) {
  return (
    <div className="dropzone">
      <input
        id="documents"
        type="file"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.txt"
        onChange={(event) => onFilesChange(Array.from(event.target.files))}
      />
      <label htmlFor="documents">
        <strong>Select documents</strong>
        <span>{uploadHelpText}</span>
        <small>Maximum 3 files per request. Maximum size is 5 MB per file.</small>
      </label>
      {files.length > 0 && (
        <div className="selected-files">
          {files.map((file) => (
            <div key={`${file.name}-${file.size}`} className="selected-file">
              <span>{file.name}</span>
              <small>{formatBytes(file.size)}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
