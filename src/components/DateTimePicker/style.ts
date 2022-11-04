import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& label': {
      color: theme.palette.text.hint,
      transform: 'translate(0, -6px) scale(0.75)  !important',
      fontSize: 15,
      fontFamily:
        '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      fontWeight: 700,
      lineHeight: 1.66,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      position: 'absolute',
      top: 18,
      left: 10,
      '&.Mui-focused': {
        color: theme.palette.text.hint,
      },
    },
    '& input': {
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      minWidth: '191px',
      background: '#ffffff00',
      border: '1px #aaa solid',
      color: '#000',
      fontSize: 14,
      width: 240,
      padding: '10px 10px 10px 50px',
    },
  },
}));

export default useStyles;
