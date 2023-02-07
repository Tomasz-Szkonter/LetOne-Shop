import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome to Let1 Shop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
