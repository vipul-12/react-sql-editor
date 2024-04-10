import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTable = styled.div`
  display: flex;
  max-height: 400px;
  overflow-y: auto;

  border: 2px solid #7bafc9; 

  .headerCell {
    position: sticky;
    top: 0;
    z-index: 1;
    font-weight: bold;
  }
`;
type ResultsProps = {
  headers: string[];
  data: any[];
};

const Results = (props: ResultsProps) => {
  return (
    <StyledTable>
      {props.data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.headers.map((item: any, index: number) => (
                  <TableCell key={index} className="headerCell">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {props.data.map((item: any, index: number) => (
                <TableRow key={index}>
                  {Object.keys(item).map((key) => (
                    <TableCell key={key}>{item[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>No Data Available</h3>
      )}
    </StyledTable>
  );
};

export default Results;
