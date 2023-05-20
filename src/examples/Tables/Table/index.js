
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable, Pagination, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import SoftButton from "components/SoftButton";

function Table({ columns, rows, rowsPerPage = 7}) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [page, setPage] = useState(1);

  const totalRows  = rows.length;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const totalPages = Math.ceil(totalRows / rowsPerPage);

 

  const endIndex = page * rowsPerPage;
  const startIndex = (rowsPerPage * (page - 1));

  const visibleRows = rows.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = visibleRows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
              <SoftBox mr={2}>
                <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </SoftBox>
              <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </SoftTypography>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
        <SoftBox display="flex" justifyContent="space-between" mt={2}>
          <SoftBox>
            <Typography variant="body1" color="textSecondary" fontSize={14} ml={3}>
              {`${startIndex + 1}-${Math.min(endIndex, totalRows)} de ${totalRows}`}
            </Typography>
          </SoftBox>
          <SoftBox>
            <Pagination
                
                count={totalPages}
                defaultPage={1}
                size="small"
                variant="outlined" color="info"
                page={page}
                onChange={handleChange}
              />
          </SoftBox>
        </SoftBox>
      </TableContainer>
    ),
    [columns, rows, page]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
