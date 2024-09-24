import React from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; // or use your library of choice here
import sampledata from '@/app/sample-data.json'

// Define Person type and sample data directly
type Person = {
  id?: number | null;
  name?: string | null;
  category?: string | null;
  subcategory?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  price?: number | null;
  sale_price?: number | null;
};





const data: Person[] = sampledata

// Column helper for generating table columns
const columnHelper = createMRTColumnHelper<Person>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('name', {
    header: ' Name',
    size: 120,
  }),
  columnHelper.accessor('category', {
    header: ' Category',
    size: 120,
  }),
  columnHelper.accessor('subcategory', {
    header: 'Subcategory',
    size: 300,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    Cell: ({ cell }) => {
      const value = cell.getValue();
      const dateValue = new Date(value!);
      return isNaN(dateValue.getTime()) ? 'Invalid Date' : dateValue.toLocaleDateString();
    },
  }),

  columnHelper.accessor('updatedAt', {


    header: 'Updated At',

  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('sale_price', {
    header: 'Sales Price',
    size: 220,
  }),
];

// CSV config for exporting data
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

// Example component for Material React Table
const Example = () => {
  const handleExportRows = (rows: MRT_Row<Person>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

// Main Dashboard component
export const Dashboard = () => {
  return (
    <div>

      <Example /> {/* Render the Material React Table inside the Dashboard */}
    </div>
  );
};

export default Dashboard;






























































