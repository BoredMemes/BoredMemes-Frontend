
import { useStyles } from './style';

const Login = () => {
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.container}`} >
        <img src='assets/imgs/ai-logo.png' className={classes.logo} />
        <div className={classes.text_body}>
          <p className={classes.text_1}> Unleash your </p>
          <p className={classes.text_2} style={{WebkitTextFillColor: 'text'}}>Potential </p>
        </div>
        <p className={classes.pixia_text}>To start using Pixia</p>
        <button className={classes.connect_btn_wallet}>Connect Wallet</button>
        <p className={classes.pixia_text_mobile}>To start using Pixia</p>
      </div>
    </>
  );
};

export default Login;
