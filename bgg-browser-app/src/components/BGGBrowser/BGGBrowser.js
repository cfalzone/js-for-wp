import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import bgg from '../../services/bgg';

const styles = theme => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
    maxHeight: '80vh',
    marginTop: theme.spacing(3),
  },
  image: {
    maxHeight: 75,
  },
});

const paginationStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = paginationStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class BGGBrowser extends Component {
  state = {
    isLoading: true,
    collection: [],
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = newPage => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)})
  };

  columns = [
    { id: 'id', label: 'Game ID', minWidth: 100, align: 'right' },
    { id: 'name', label: 'Name (Year)'},
    { id: 'thumb', label: 'Image', maxWidth: 100, align: 'center' },
    { id: 'type', label: 'Game Type', minWidth: 100 }
  ];

  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isLoading, collection, page, rowsPerPage } = this.state;

    let limit = 20;
    if (collection.lenth < limit) {
      limit = collection.length;
    }

    return (
      <Fragment>
        { isLoading ? (
          <div className={classes.center}>
            <Box position="absolute" top="50%" left="50%">
              <CircularProgress />
            </Box>
          </div>
        ) : (
          <Fragment>
            <div className={classes.tableWrapper}>
              <Table stickyHeader 
                  className={classes.table}
                  aria-label="sticky custom pagination table">
                <TableHead>
                  <TableRow>
                    {this.columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(
                    collection.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ).map(game => (
                    <TableRow key={game.id}>
                      <TableCell align="right">{game.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {game.name} ({game.yearPublished})
                      </TableCell>
                      <TableCell align="center">
                        <img className={classes.image} src={game.thumb} alt={game.name} />
                      </TableCell>
                      <TableCell>{game.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component='div'
              rowsPerPageOptions={[5, 10, 25, 50]}
              colSpan={4}
              count={collection.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Fragment>
        ) }
      </Fragment>
    );
  }

  componentDidMount() {
    bgg.loadCollection(this.props.username).then(collection => {
      this.setState({
        isLoading: false,
        collection
      })
    });
  }
}

BGGBrowser.propTypes = {
  // Properties
  username: PropTypes.string,
};

export default withStyles(styles)(BGGBrowser);
