import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Routes from '../../routes';
import { ThemeProvider } from "theme/ThemeContext";
import { useAxios } from 'hooks/useAxios';
import { GlobalValueProvider } from 'theme/GlobalValueProvider';
function App() {
  useAxios();
  return (
    <ThemeProvider>
      <GlobalValueProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Router basename={process.env.PUBLIC_URL}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </GlobalValueProvider>
    </ThemeProvider>
  );
}

export default App;
