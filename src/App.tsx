import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider} from 'react-redux';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Colors from './styles/Colors';
import ViewSalesData from './pages/ViewSalesData';
import ViewSalesDataSlice from './pages/ViewSalesData/index.slice';
import Header from './components/Header';


// **** Setup **** //

const reduxStore = configureStore({
  reducer: ViewSalesDataSlice,
});

export type AppDispatch = typeof reduxStore.dispatch;


// **** Components **** //

/**
 * Main component where everything else is loaded from.
 */
function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <Provider store={reduxStore}>
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
                  element={<Navigate to="view-sales-data/B007TIE0GQ"/>}
                />
                <Route
                  path="/view-sales-data/:productId"
                  element={<ViewSalesData/>}
                />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </Provider>
    </div>
  );
}


// **** Export default **** //

export default App;
