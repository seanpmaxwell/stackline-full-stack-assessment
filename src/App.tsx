import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Colors from './styles/Colors';
import ViewSalesData from './pages/ViewSalesData';
import Header from './components/Header';


// **** Components **** //

/**
 * Main component where everything else is loaded from.
 */
function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <BrowserRouter>
        <Box sx={{
          backgroundColor: Colors.mainBkgColor,
          height: '100vh',
        }}>
          <Header/>
          <Routes>
            <Route>
              <Route
                path="/"
                element={<Navigate to="view-sales-data"/>}
              />
              <Route
                path="/view-sales-data/:productId"
                element={<ViewSalesData/>}
              />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}


// **** Export default **** //

export default App;
