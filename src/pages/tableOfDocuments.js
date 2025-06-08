import { useEffect, useState } from "react";
import { Card, tab, Typography } from "@material-tailwind/react";
import { GetUserEntries } from "../helpers/fetchbackend.js";
import { GetUserEntryById } from "../helpers/fetchbackend.js";


const TABLE_HEAD = ["Name", "DocumentID", "Summary", "Sentiment","CreatedAt",""];


async function handleAutofill(DocumentID, setIsEditing, setText, setfileName) {
    const result = await GetUserEntryById(localStorage.getItem("email"), DocumentID);
    let text = "";
    let tmp = "";
    for (const key in result) {
        text = result[key].text_data;
        tmp = result[key].file_name;
    }

    setText(`<p>${text}</p>`);
    setfileName(tmp);
    setIsEditing(true);
}

function renderRow(name, DocumentID, Summary, Sentiment, classes, created_at, setIsEditing, setText, setfileName) {
  return (
    <tr key={DocumentID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {name}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {DocumentID}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {Summary}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {Sentiment}
        </Typography>
      </td>
        <td className={classes}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-200">
          {created_at}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          as="a"
          href="#"
          variant="small"
          className="font-medium text-blue-600 dark:text-blue-400"
          onClick={() => handleAutofill(DocumentID, setIsEditing, setText, setfileName)}
          
        >
          Edit
        </Typography>
      </td>
    </tr>
  );
}

export function TableOfDocuments({ setIsEditing, setText, setfileName }) {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const entries = await GetUserEntries(localStorage.getItem("email"));
    let formatted = [];
    for (const obj in entries.entries) {
        const tmp = {
            file_name: entries.entries[obj].file_name,
            id: entries.entries[obj].id,
            summary: entries.entries[obj].summary,
            sentiment: entries.entries[obj].sentiment,
            created_at: entries.entries[obj].created_at
        }
        formatted.push(tmp);
    };

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
          {tableRows.map(({ file_name, id, summary, sentiment, created_at }, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-100 dark:border-gray-700";
            return renderRow(file_name, id, summary, sentiment, classes, created_at, setIsEditing, setText, setfileName);
          })}
        </tbody>
      </table>
    </Card>
  );
}
