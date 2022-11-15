import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, styled, Theme } from '@material-ui/core/styles';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import TextField from '@mui/material/TextField';
interface MakeStylesPropType {
  size: string;
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.4)',
    },
  },
});

interface InputPropsType {
  startIcon?: any;
  endIcon?: any;
  placeholder?: string;
  className?: string;
  wrapperClass?: string;
  label?: any;
  name?: string;
  size?: 'small' | 'medium';
  isMulti?: boolean;
  error?: boolean;
  row?: number;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChangeData?: (val: string) => void;
  register?: UseFormRegister<FieldValues> | null;
}

const useStyles = makeStyles<Theme, MakeStylesPropType>(theme => ({
  wrapper: {
    width : '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    fontWeight: 500,
    border: `none`,
    background: '#F7F9FA',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: props => (props.size === 'small' ? 13 : 14),
    minHeight: props => (props.size === 'small' ? 41 : 48),
    borderRadius: 15,

    

    '& .Mui-error': {
      borderColor: 'red',
    },
    '& input::placeholder, & textarea::placeholder,': {
      opacity: 1,
      
    },
    '& textarea': {
      [theme.breakpoints.down('xs')]: {
        fontSize : 12,
      },
      '&::placeholder,': {
        [theme.breakpoints.down('xs')]: {
          fontSize : 12,
        },
      },
    },
    '& .MuiOutlinedInput-root': {
      [theme.breakpoints.down('xs')]: {
        padding : '10px !important',
      },
    },
  },
  icon: {
    fontSize: 25,
  },
  label: {
    marginBottom: 9,
    fontSize: 18,
    fontWeight: 500,
    '& span': {
      color: '#f00',
    },
  },
}));
const InputField = ({
  placeholder = '',
  className = '',
  wrapperClass = '',
  name = '',
  label = null,
  size = 'medium',
  isMulti = false,
  row = 3,
  value = '',
  onChangeData,
  error = null,
  register = null,
  type = 'text',
  disabled = false,
}: InputPropsType) => {
  const classes = useStyles({ size });
  const [val, setVal] = useState<string>(value);

  const changeHandler = (data: string) => {
    setVal(data);
    onChangeData && onChangeData(data);
  };

  return (
    <div className={clsx(classes.wrapper, wrapperClass)}>
      <CssTextField 
        className={clsx(classes.root, className)} id="outlined-basic" label={label} variant="outlined" 
        multiline={isMulti}
        onChange={e => {
          changeHandler(e.currentTarget.value);
        }}
        placeholder = {placeholder}
        type = {type}
        error={error}
        rows={row}
        defaultValue={val}
        {...(register && register(name, { required: false }))}
        
        disabled={disabled}
        />
      
    </div>
  );
};

export default InputField;
