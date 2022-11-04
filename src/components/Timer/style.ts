import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    '& span': {
      display: 'flex',
      gap: 5,
    },
    padding: 6,
    gap: 5,
    marginTop: -100,
    marginBottom: 8,
    position: 'absolute',
    paddingRight: 20,
    zIndex: 1,
    top: 130,
    right: 10,
    fontWeight: 700,
    display: 'flex',
    // border: `1px solid #00d9ac`,
    color: '#333',
    backgroundColor: '#00d9ac',
    boxShadow: `3px 3px 3px #00000055`,
    // borderRadius: theme.shape.cardBorderRadius,
    // background: theme.palette.type === 'light' ? theme.palette.surface[0] : theme.palette.surface[1],
  },
}));

export default useStyles;
