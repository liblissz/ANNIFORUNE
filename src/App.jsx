import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Createpage from './pages/Createpage';
import NotDetailpage from './pages/NoteDetailpage';
import NotificationListener from './pages/NotificationListener';
import { Toaster } from 'react-hot-toast'; // to show toast messages

const App = () => {
  return (
    <div data-theme="forest" className='min-h-screen'>
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Socket.IO Notification Listener */}
      <NotificationListener />

      {/* Routes */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/create' element={<Createpage />} />
        <Route path='/notes/:id' element={<NotDetailpage />} />
      </Routes>
    </div>
  );
};

export default App;
