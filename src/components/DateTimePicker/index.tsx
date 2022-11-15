import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './style';
export default function DateTimePickerField({ label, value, onChange }) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        className={classes.root}
        label={<img src="/assets/images/calender_03.svg" alt="" />}
        inputVariant="outlined"
        value={value}
        onChange={onChange}
      />
    </MuiPickersUtilsProvider>
  );
}
