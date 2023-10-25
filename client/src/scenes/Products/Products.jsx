import React, {useState} from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material';

import { useGetProductsQuery } from 'state/api';

import Header from "components/Header/Header";
import AddProducts from './AddProducts';

const Product = ({
  _id,
  category,
  name,
  description,
  mrpPrice,
  discount,
  quantity, 
  tagline,
  rating,
  // stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded ] = useState(false);
  return (
    <Card
    sx={{
      backgroundImage : "none",
      backgroundColor : theme.palette.background.alt,
      borderRadius : "0.55rem"
    }}>
      <CardContent>
        <Typography sx={{fontSize :14}} 
        color={theme.palette.secondary[500]} 
        gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5' component="div">
          {name}
        </Typography>
        <Typography sx={{mb : "1.5rem"}} color={theme.palette.secondary[400]}>
          Rs.{Number(mrpPrice).toFixed(0)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant='body2'>
          {description}
        </Typography>
      </CardContent>
      
      <CardActions sx={{display:"flex", justifyContent:"space-between"}} >
        <Button variant='contained'
        color="success"
        size='small'
        onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
        <Button variant='contained'
        color="info"
        size='small'
        onClick={() => setIsExpanded(!isExpanded)}
        >
          View
        </Button>
        
      </CardActions>
      <Collapse
      in={isExpanded}
      timeout="auto"
      unmountOnExit
      sx={{color : theme.palette.neutral[300]}}>
        <CardContent>
          <Typography>id : {_id} </Typography>
          <Typography>Supply Left : {quantity} </Typography>
          <Typography>{tagline}</Typography>
          <Typography>{discount}</Typography>
          {/* <Typography>Yearly sales This Year : {stat.yearlySalesTotal} </Typography>
          <Typography>Yearly Units Sold this Year : {stat.yearlyTotalSoldUnits} </Typography> */}
          
        </CardContent>
      </Collapse>
    </Card>
  )
}

const Products = () => {
  const { data , isLoading} = useGetProductsQuery();
  console.log("🚀 ~ file: Products.jsx:10 ~ Products ~ data:", data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  
  
  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between">
        <Header title="PRODUCTS" subTitle="See list of all your Products." textAlignment="left" />
        <AddProducts />
      </Box>
      
      {data || !isLoading ?
      <Box
       mt="20px"
       display="grid" 
       gridTemplateColumns="repeat(4, minmax(0 , 1fr))"
       justifyContent="space-between"
       rowGap="20px"
       columnGap="1.33%"
       sx={{
        "& > div" : {gridColumn:isNonMobile ? undefined : "span 4"}
       }} >
        {
          data.map(({
            _id,
            category,
            name,
            description,
            mrpPrice,
            discount,
            quantity, 
            tagline,
            rating,
            // stat,
          }) => (
            <Product 
            key={_id}
            _id={_id}
            category={category}
            name={name}
            description={description}
            mrpPrice={mrpPrice}
            discount={discount}
            quantity={quantity}
            tagline={tagline}
            rating={rating}
            // stat={stat}
            />
          )
        )}

      </Box> 
      : <>Loading...</>
      }
    </Box>
  );
}

export default Products