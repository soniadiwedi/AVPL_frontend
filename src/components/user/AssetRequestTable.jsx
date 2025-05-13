import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import AssetRequestModal from "./AssetRequestModal";
import useDelete from "../../hooks/useDelete";
import { baseUrl } from "../../utils/data";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Approved":
      return "success";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

const AssetRequestTable = ({ data, user, fetchData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteData } = useDelete(`${baseUrl}/api/asset-requests`); // Provide the URL for your delete API

  const filteredData = data?.filter(
    (item) => item.requestedByUserId?._id === user._id
  );

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const onWithdraw = async (item) => {
    try {
      await deleteData(item._id); // Assuming the ID is stored in _id
      fetchData(); // Refresh the data after deletion
    } catch (err) {
      console.error("Error while deleting:", err);
    }
  };

  return (
    <Box p={1}>
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{ overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <b>S.No.</b>
              </TableCell>
              <TableCell>
                <b>Asset Type</b>
              </TableCell>
              <TableCell>
                <b>Purpose</b>
              </TableCell>
              <TableCell>
                <b>Priority</b>
              </TableCell>
             
              <TableCell>
                <b>Location</b>
              </TableCell>
              
              <TableCell>
                <b>Request Date</b>
              </TableCell>
              <TableCell>
                <b>Expiry Date</b>
              </TableCell>
               <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData?.map((item, index) => (
              <TableRow key={item._id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.assetType}</TableCell>
                <TableCell>{item.purposeOfRequest}</TableCell>
                <TableCell>
                  <Chip
                    label={item.priorityLevel}
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{item.location}</TableCell>
                <TableCell>
                  {format(new Date(item.requestDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(item.expiryDate), "dd MMM yyyy")} -{" "}
                  <p
                    className={
                      item.isExpired
                        ? "text-xs text-red-600 font-semibold"
                        : "text-xs text-green-600 font-semibold"
                    }
                  >
                    {item.isExpired ? "Expired" : "Active"}
                  </p>
                </TableCell>

                <TableCell>
                  <Chip
                    label={item.requestStatus}
                    color={getStatusColor(item.requestStatus)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(item)}
                      disabled={item.isExpired||item.requestStatus==="Approved"}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => onWithdraw(item)}
                      disabled={item.isExpired||item.requestStatus==="Approved"}
                    >
                      Withdraw
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <AssetRequestModal
          user={user}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedItem={selectedItem}
          fetchData={fetchData}
        />
      )}
    </Box>
  );
};

export default AssetRequestTable;
