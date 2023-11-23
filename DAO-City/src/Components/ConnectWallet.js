// ConnectWallet.js
import { showConnect } from '@stacks/connect';
import { userSession } from './UserSession';

const myAppName = 'DAO CITY'; // shown in wallet pop-up
const myAppIcon = window.location.origin + '/dao-city-logo.png'; // shown in wallet pop-up

export const connectWallet = () => {
  showConnect({
    userSession, // `userSession` from previous step, to access storage
    appDetails: {
      name: myAppName,
      icon: myAppIcon,
    },
    onFinish: () => {
      window.location.reload(); // WHEN user confirms pop-up
    },
    onCancel: () => {
      console.log('oops'); // WHEN user cancels/closes pop-up
    },
  });
};