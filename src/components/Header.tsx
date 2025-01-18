import Box from '@mui/material/Box';

import logo from '../assets/stackline_logo.svg';


// **** Components **** //

/**
 * Header component to display across all pages.
 */
function Header() {
  return (
    <Box style={{
      backgroundColor: '#000000',
    }}>
      <img
        alt="logo"
        src={logo}
        style={{
          height: 20,
          width: 20,
        }}
      />
      ass
    </Box>
  )
}


// **** Export default **** //

export default Header
