import React, { createContext, useContext, useState } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, IconButton, List, ListItem, ListItemText, TextField, Box } from '@mui/material';
import { createStyles } from '@mui/material/styles/';
import {Add, Delete, Remove, RemoveCircle} from '@mui/icons-material'
import { CartContext, Product } from '../routes/root';
import { useNavigate } from 'react-router-dom';

interface ShoppingCartProps {
    onClose: () => void;
  }

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onClose }) => {
    const navigate = useNavigate();

    const { cart, removeFromCart } = useContext(CartContext);

    const [products, setProducts] = useState<Product[]>([
        ...cart
    ]);

    const handleIncrement = (index: number) => {
        const newProducts = [...products];
        newProducts[index].quantity++;
        setProducts(newProducts);
    };

    const handleDecrement = (index: number) => {
        const newProducts = [...products];
        newProducts[index].quantity = Math.max(1, newProducts[index].quantity - 1);
        setProducts(newProducts);
    };

    const handleRemove = (product: Product, index: number) => {
        let newProducts = []
        if (products.length == 1) {
            newProducts = []
        }
        else {
            newProducts = products.splice(index, 1)
        }
        debugger;
        setProducts(newProducts)
        removeFromCart(product)
    }

    const handleCheckout = () => {
        onClose(); 
        navigate('/checkout', { state: { cart } });
      };

    if(!products || products.length <= 0) {
        return (
            <Box>
               <Typography variant="h4" align="center" gutterBottom>
                    Shopping Cart is Empty
                </Typography>
            </Box>
        )
    }
    return (
        <>
        <List sx={{backgroundColor: 'white'}}>
        {cart.map((product, index) => (
            <ListItem key={index}>
            <IconButton onClick={() => handleRemove(product, index)}>
                <Delete/>
            </IconButton>
            <ListItemText primary={product.name} />
            <TextField sx={{width:'15%', marginRight:'15px'}} value={`R$${product.price}`} InputProps={{readOnly: true}}></TextField>
            <TextField type="number" sx={{width:'10%'}} value={product.quantity} InputProps={{ readOnly: true }} />
            <IconButton onClick={() => handleIncrement(index)}>
                <Add />
            </IconButton>
            <IconButton onClick={() => handleDecrement(index)}>
                <Remove />
            </IconButton>
            </ListItem>
        ))}
        </List>
        <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" sx={{marginTop: '15px'}} onClick={handleCheckout}>
                Go to checkout
            </Button>
        </Box>
        </>
    );
}

export default ShoppingCart;