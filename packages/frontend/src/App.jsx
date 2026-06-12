import React from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';


import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import Notifications from './pages/Notifications.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Orders from './pages/Orders.jsx';
import Payments from './pages/Payments.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import EditProfile from './pages/EditProfile.jsx';
import Address from './pages/Address.jsx';
import Reviews from './pages/Reviews.jsx';

function Nav() {
  const items = [
    ['Profile', '/profile'],
    ['Edit Profile', '/edit-profile'],
    ['Cart', '/cart'],
    ['Notifications', '/notifications'],
    ['Wishlist', '/wishlist'],
    ['Orders', '/orders'],
    ['Payments', '/payments'],
    ['Help Center', '/helpcenter'],
    ['Address', '/address'],
    ['Reviews', '/reviews'],
  ];

  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
      {items.map(([label, to]) => (
        <Link key={to} to={to} style={{ textDecoration: 'none' }}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/address" element={<Address />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/" element={<Navigate to="/login" replace />} />


      </Routes>
    </div>
  );
}

