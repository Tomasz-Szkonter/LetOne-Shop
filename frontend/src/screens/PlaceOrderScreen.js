import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/utility/CheckoutSteps';
import Message from '../components/utility/Message';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const orderCart = {};

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  orderCart.itemsPrice = addDecimals(
    orderCart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  orderCart.shippingPrice = addDecimals(orderCart.itemsPrice > 100 ? 0 : 10);
  orderCart.taxPrice = addDecimals(
    Number((0.15 * orderCart.itemsPrice).toFixed(2))
  );
  orderCart.totalPrice = (
    Number(orderCart.itemsPrice) +
    Number(orderCart.shippingPrice) +
    Number(orderCart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      // dispatch({ type: USER_DETAILS_RESET })
      // dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: orderCart.itemsPrice,
        shippingPrice: orderCart.shippingPrice,
        taxPrice: orderCart.taxPrice,
        totalPrice: orderCart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <div>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <div>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <div>
                <strong>Items: </strong>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <LinkContainer to={`/product/${item.product}`}>
                              <span>{item.name}</span>
                            </LinkContainer>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderCart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderCart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderCart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderCart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    className="btn-block"
                    variant="main"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
