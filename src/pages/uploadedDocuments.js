import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { GetUserUploads } from "../helpers/fetchbackend.js";
import ModalImage from "react-modal-image";
import { se } from "date-fns/locale/se";
const TABLE_HEAD = ["Name", "DocumentID", "CreatedAt", "filetype", ""];


const getPublicFileUrl = (filePath) => {
  // Replace backslashes with forward slashes (Windows -> Web)
  const normalized = filePath.replace(/\\/g, "/");
  return `http://localhost:5000/${normalized}`;
};

function handleViewFile(file_path, setSelectedImage, file_type) {
    if (file_type === "png" || file_type === "jpg" || file_type === "jpeg") {
        let image_url = getPublicFileUrl(file_path);
        setSelectedImage(image_url);
    }

}

function renderRow(fileName, DocumentID, created_at, classes, file_path, setSelectedImage, file_type) {
  return (
    <tr key={DocumentID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {fileName.split("/").pop(-1)}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {DocumentID}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {created_at}
        </Typography>
      </td>
    <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {file_type}
        </Typography>
      </td>
        <td className={classes}>
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium text-blue-600 dark:text-blue-400"   
                onClick={(e) => {
                    e.preventDefault();
                    handleViewFile(file_path, setSelectedImage, file_type);
                    }}
              >
                View
              </Typography>
        </td>
    </tr>
  );
}


export function TableOfUploadedDocuments() {
  const [tableRows, setTableRows] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const entries = await GetUserUploads(localStorage.getItem("email"));
      const formatted = [];
        console.log(entries.uploads);
      for (const obj of entries.uploads) {
        formatted.push({
          file_name: obj.file_path.split("\\").pop(-1),
          id: obj.id,
          created_at: obj.created_at,
          file_path : obj.file_path,
          file_type: obj.file_type
        });
      }

      formatted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setTableRows(formatted);
    };

    fetchData();
  }, []);

  return (
    
    <Card className="h-full w-full overflow-scroll bg-white dark:bg-gray-800">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 p-4"
              >
                <Typography
                  variant="small"
                  className="font-normal leading-none text-gray-700 dark:text-gray-300 opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(({ file_name, id, created_at, file_path, file_type}, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-100 dark:border-gray-700";
            return renderRow(file_name, id, created_at, classes, file_path, setSelectedImage, file_type);
          })}
        </tbody>
      </table>

        {selectedImage && (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setSelectedImage(null)} // close on background click
        >
            <div onClick={(e) => e.stopPropagation()}>
            <ModalImage
                small={selectedImage}
                large={selectedImage}
                alt="Uploaded Image"
                hideDownload
                hideZoom
                onClose={() => setSelectedImage(null)}
            />
            </div>
        </div>
        )}

    </Card>
    
  );
}
