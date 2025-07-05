import { useEffect } from 'react';
import toast from 'react-hot-toast';
import socket from './socket';

const NotificationListener = () => {
  useEffect(() => {
    // Request permission once
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast.success('🔔 Notifications enabled');
        }
      });
    }

    // Create Note listener
    socket.on('PushNotification', ({ newNote }) => {
      toast.success(`📝 New note created: ${newNote.title}`);

      if (Notification.permission === 'granted') {
        new Notification("📝 New Note Added", {
          body: newNote.title,
          icon: "/note-icon.png"
        });
      }
    });


    // Delete Note listener
    socket.on('NoteDeleted', ({ deletedNote }) => {
      toast(`🗑️ Note deleted: ${deletedNote.title}`);

      if (Notification.permission === 'granted') {
        new Notification("🗑️ Note Deleted", {
          body: deletedNote.title,
          icon: "/delete-icon.png"
        });
      }
    });

    return () => {
      socket.off('PushNotification');
    //   socket.off('updatedNote'); 
      socket.off('NoteDeleted');
    };
  }, []);

  return null;
};

export default NotificationListener;
