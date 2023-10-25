import {  Check, Save } from '@mui/icons-material';
import { Box, CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import React, {useState} from 'react';


export const OrdersAction = ({params, rowId, setRowId}) => {
  const[sucess, setSucess] = useState(false);
  const[statusLoading, isStatusLoading] = useState(false);
  const handleSubmit = async() => {};
  return (
    <Box
    sx={{
      m : 1,
      position : "releative"
    }}
    >
      { sucess ? (
        <Fab color='primary'
        sx={{
          width : 40,
          height : 40,
          bgcolor : green[500],
          '&:hover' : {bgcolor : green[700]}
        }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab color='primary'
        sx={{
          width : 40,
          height : 40,
        }}
        disabled={params.id !== rowId || statusLoading}
        onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}

      {statusLoading && (
        <CircularProgress 
        size={52}
        sx={{
          color : green[500],
          position : "absolute",
          top : -6,
          left : -6,
          zIndex : 1,
        }}
        />
      )}

    </Box>
  )
}
