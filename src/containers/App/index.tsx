import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Routes from '../../routes';
import { Toaster } from 'react-hot-toast';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { ThemeProvider } from "theme/ThemeContext";
function App() {
  useEagerConnect();
  return (
    <ThemeProvider>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Router basename={process.env.PUBLIC_URL}>
          <Routes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
