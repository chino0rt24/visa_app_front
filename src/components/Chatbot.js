import React from 'react'
import { Box } from '@mui/material'
const Chatbot = () => {
  return (
    <Box xs={12} display={'flex'} flexDirection={'row'} justifyContent={'center'}  >
        <iframe
      title="Embedded Page"
      src={"https://lustrous-cactus-5f5e09.netlify.app/"}
      width={"70%"}
      height={"600px"}
      frameBorder="0"
      allowFullScreen
    />
    </Box>
    
  )
}

export default Chatbot