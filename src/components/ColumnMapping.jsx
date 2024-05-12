import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { TextField, Button } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ColumnMapping({
  fileId,
  columns,
  colMerge,
  setColMerge,
  colRecurring,
  setColRecurring,
}) {
  const theme = useTheme();

  const handleChange1 = (lineIndex, event) => {
    const newLines = [...colMerge];
    newLines[lineIndex].selectedOptions1 = event.target.value;
    setColMerge(newLines);
  };

  const handleAddLine1 = (lineIndex) => {
    const newLines = [...colMerge];
    newLines.splice(lineIndex + 1, 0, {
      selectedOptions1: [],
      newColumnName1: "",
    });
    setColMerge(newLines);
  };

  const handleRemoveLine1 = (lineIndex) => {
    const newLines = [...colMerge];
    newLines.splice(lineIndex, 1);
    setColMerge(newLines);
  };

  const handleColumnNameChange1 = (lineIndex, event) => {
    const newLines = [...colMerge];
    newLines[lineIndex].newColumnName1 = event.target.value;
    setColMerge(newLines);
  };

  const handleChange2 = (lineIndex, event) => {
    const newLines = [...colRecurring];
    newLines[lineIndex].selectedOptions1 = event.target.value;
    setColRecurring(newLines);
  };

  const handleAddLine2 = (lineIndex) => {
    const newLines = [...colRecurring];
    newLines.splice(lineIndex + 1, 0, {
      selectedOptions1: [],
      newColumnName1: "",
    });
    setColRecurring(newLines);
  };

  const handleRemoveLine2 = (lineIndex) => {
    const newLines = [...colRecurring];
    newLines.splice(lineIndex, 1);
    setColRecurring(newLines);
  };

  const handleColumnNameChange2 = (lineIndex, event) => {
    const newLines = [...colRecurring];
    newLines[lineIndex].newColumnName1 = event.target.value;
    setColRecurring(newLines);
  };

  console.log(colMerge);
  console.log(colRecurring);

  return (
    <div style={{ maxHeight: "calc(70vh - 200px)", overflowY: "auto" }}>
      {colMerge.map((line, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl sx={{ m: 1, minWidth: "50%", maxWidth: "90%" }}>
            <InputLabel id={`demo-multiple-chip-label1-${index}`}>
              Select Columns to merge
            </InputLabel>
            <Select
              labelId={`demo-multiple-chip-label1-${index}`}
              id={`demo-multiple-chip1-${index}`}
              multiple
              value={line.selectedOptions1}
              onChange={(event) => handleChange1(index, event)}
              input={
                <OutlinedInput
                  id={`select-multiple-chip1-${index}`}
                  label="Select Columns to merge"
                />
              }
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {columns.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, line.selectedOptions1, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={`demo-multiple-chip-label1-${index}`}>
              Select Columns to merge
            </InputLabel>
            <Select
              labelId={`demo-multiple-chip-label1-${index}`}
              id={`demo-multiple-chip1-${index}`}
              multiple
              value={line.selectedOptions1}
              onChange={(event) => handleChange1(index, event)}
              input={
                <OutlinedInput
                  id={`select-multiple-chip1-${index}`}
                  label="Select Columns to merge"
                />
              }
              MenuProps={MenuProps}
            >
              {columns.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, line.selectedOptions1, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TextField
            id={`text-field1-${index}`}
            label="Enter New Column Name"
            variant="outlined"
            value={line.newColumnName1}
            onChange={(event) => handleColumnNameChange1(index, event)}
          />
          <Button variant="contained" onClick={() => handleAddLine1(index)}>
            +
          </Button>
          {index !== 0 && (
            <Button
              variant="contained"
              onClick={() => handleRemoveLine1(index)}
            >
              X
            </Button>
          )}
        </Box>
      ))}
      {colRecurring.map((line, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl sx={{ m: 1, minWidth: "50%", maxWidth: "90%" }}>
            <InputLabel id={`demo-multiple-chip-label1-${index}`}>
              Select Recurring Columns
            </InputLabel>
            <Select
              labelId={`demo-multiple-chip-label1-${index}`}
              id={`demo-multiple-chip1-${index}`}
              multiple
              value={line.selectedOptions1}
              onChange={(event) => handleChange2(index, event)}
              input={
                <OutlinedInput
                  id={`select-multiple-chip1-${index}`}
                  label="Select Recurring Columns"
                />
              }
              MenuProps={MenuProps}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {columns.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, line.selectedOptions1, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={`demo-multiple-chip-label1-${index}`}>
              Select recurring columns
            </InputLabel>
            <Select
              labelId={`demo-multiple-chip-label1-${index}`}
              id={`demo-multiple-chip1-${index}`}
              multiple
              value={line.selectedOptions1}
              onChange={(event) => handleChange2(index, event)}
              input={
                <OutlinedInput
                  id={`select-multiple-chip1-${index}`}
                  label="Select Columns to merge"
                />
              }
              MenuProps={MenuProps}
            >
              {columns.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, line.selectedOptions1, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TextField
            id={`text-field1-${index}`}
            label="Enter New Column Name"
            variant="outlined"
            value={line.newColumnName1}
            onChange={(event) => handleColumnNameChange2(index, event)}
          />
          <Button variant="contained" onClick={() => handleAddLine2(index)}>
            +
          </Button>
          {index !== 0 && (
            <Button
              variant="contained"
              onClick={() => handleRemoveLine2(index)}
            >
              X
            </Button>
          )}
        </Box>
      ))}
    </div>
  );
}
