import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import logo from '../assets/stackline_logo.svg';
import Colors from '../styles/Colors';


// **** Components **** //

/**
 * Header component to display across all pages.
 */
function Header() {
  return (
    <AppBar sx={{
      position: 'static',
      backgroundColor: Colors.headerBkg,
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters={true}>
          <img
            alt="logo"
            src={logo}
            style={{
              height: 25,
            }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}


// **** Export default **** //

export default Header
