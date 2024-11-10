import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, List, ListItem } from '@mui/material';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from "../../amplify/data/resource";

interface Order {
  id: string;
  items: Item[];
  total?: number;
}

interface Item {
    price: number;
    name: string;
    id?: string;
}
const client = generateClient<Schema>();

const Orders: React.FC = () => {
    const [orders, setOrders] = useState([]);
      useEffect(() => {
        async function getToken() {
            const order = await client.models.Order.list(
                { authMode: 'userPool', selectionSet: ["id", "items.*"] },
              );

              let newOrders = []
              for (let oneOrder of order.data) {
                let newOrder = oneOrder as any;
                let total = 0;
                let itemsList=[];
                for (let oneItem of newOrder.items) {
                    let currentItem = oneItem as any;
                    let myItem = await client.models.CafeItem.get({id: currentItem.cafeItemId as any}, {authMode: 'apiKey'})
                    total += Number(myItem.data.price)
                    itemsList.push(myItem.data)
                }
                newOrder.items = itemsList;
                newOrder.total = total;
                newOrders.push(newOrder)
              }
              setOrders(newOrders)
        };

        if (!orders || orders.length <=0) {
            getToken();
        }
      }, []);      

  if (!orders || orders.length <= 0) {
    return (
        <>
         <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
         </Box>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" align="center" gutterBottom>
                Loading your orders...
            </Typography>
         </Box>
        </>
    )
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" align="center" gutterBottom>
        Your Orders
      </Typography>
      {orders.map((order) => (
        <Card key={order.id} style={{ width: '80%', margin: '20px auto' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Order ID: {order.id}
            </Typography>
            {order.items.map((item) => (
                <>
                    <Typography variant="body1" align="center">
                        {item.name} R${item.price}
                    </Typography>
                </>
            ))}
            <Typography variant="h6" align="center">
              Total: R${order?.total?.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Orders;
