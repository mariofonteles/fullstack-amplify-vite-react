import React, { useContext, useEffect, useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { createStyles } from '@mui/material/styles/';
import { CartContext } from "../routes/root"
import { generateClient } from 'aws-amplify/api';
import type { Schema } from "../../amplify/data/resource";
import { Add } from '@mui/icons-material';

const useStyles = createStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const client = generateClient<Schema>();


const Home: React.FC = () => {
const [products, setProducts] = useState<Array<Schema["CafeItem"]["type"]>>([]);

  useEffect(() => {
    client.models.CafeItem.observeQuery().subscribe({
      next: (data) => setProducts([...data.items]),
    });
  }, []);
  
  const client = generateClient<Schema>();

  console.log(products)

  const { addToCart } = useContext(CartContext);

  const handleAddToCartClick = (product: any) => {
    addToCart({name: product.name, quantity: 1, price: product.price, id: product.id});
  };

  if(!products || products.length <= 0) {
    return (
        <>
         <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
         </Box>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" align="center" gutterBottom>
                Loading products...
            </Typography>
         </Box>
        </>
    )
  }
  return (
    <>
     <Typography variant="h4" align="center" gutterBottom>
        Choose your products:
      </Typography>
    <Grid container spacing={2} justifyContent={'start'} sx={{marginTop: '20px'}}>
        {products.map((product, index) => (
        <Grid item xs={3} key={index} sx={{display:'flex', justifyContent:'center'}}>
          <Card sx={{width: '15vw'}}>
            <CardActionArea>
              <CardMedia
                sx={{height: 140}}
                image="https://via.placeholder.com/150"
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  R${product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleAddToCartClick(product)}>
              <Add /> Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

export default Home;