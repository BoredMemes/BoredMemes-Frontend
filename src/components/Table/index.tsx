import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    '& .MuiTableCell-root': {
      borderBottom: `1px solid #BABABA55`,
      minWidth: 100,
      fontWeight: 600,
      color: '#000',
      [theme.breakpoints.down('sm')]: {
        padding: 10,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 8,
        padding: '10px 0px !important',
        minWidth: 'auto',
        '& button': {
          fontSize: 8,
          height: 30,
          borderRadius: 7,
        },
        '& img': {
          height: 10,
        },
      },
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      // background: '#006a66 !important',
      fontWeight: 700,
      color: '#000',
    },
  },
  container: {
    borderRadius: '5px',
  },
  myCell: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const BasicTable = ({ columns, rows }) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, k) => (
              <TableCell key={k}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, kk) => (
            <TableRow key={kk}>
              {columns.map((column, k) => (
                <TableCell
                  style={{
                    width: `${100 / columns.length}%`,
                    borderColor: kk === rows.length - 1 ? '#ffffff00' : '#BABABA55',
                    paddingBottom: kk === rows.length - 1 ? 0 : 16,
                  }}
                  key={k}
                >
                  {row[column.key]}
                  {/* {column.key === 'button' ? <div className={classes.myCell}>{row[column.key]}</div> : row[column.key]} */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
