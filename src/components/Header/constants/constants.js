export const PAGES = ['Home', 'New Cars', 'Used Cars', 'Sell', 'About Us', 'Contact'];

export const accountSlotProps = {
  paper: {
    elevation: 0,
    sx: {
      color: 'white',
      bgcolor: '#12232e',
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 20,
        width: 10,
        height: 10,
        bgcolor: '#12232e',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
}

export const navSlotProps = {
  paper: {
    elevation: 0,
    sx: {
      width: '100%',
      color: 'white',
      bgcolor: '#12232e',
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
    },
  },
}

