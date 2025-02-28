import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    invoice_name: '',
    nip: '',
    company_address: '',
  });
  const [emailFormVisible, setEmailFormVisible] = useState(false);
  const [passwordFormVisible, setPasswordFormVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Pobieranie danych użytkownika
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://ordermanagement-production-0b45.up.railway.app:8080/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Aktualizacja danych do faktury
  const handleUpdateProfile = async () => {
    try {
      await axios.patch(
        'https://ordermanagement-production-0b45.up.railway.app:8080/api/users/profile/',
        {
          invoice_name: profileData.invoice_name,
          nip: profileData.nip,
          company_address: profileData.company_address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Dane zostały zaktualizowane.');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Wystąpił błąd podczas aktualizacji.');
    }
  };

  // Zmiana adresu e-mail
  const handleChangeEmail = async () => {
    if (newEmail !== confirmNewEmail) {
      alert('Adresy e-mail nie są zgodne.');
      return;
    }

    try {
      await axios.patch(
        'https://ordermanagement-production-0b45.up.railway.app:8080/api/users/change-email/',
        { email: newEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Adres e-mail został zaktualizowany.');
      setEmailFormVisible(false);
    } catch (error) {
      console.error('Error changing email:', error);
      alert('Wystąpił błąd podczas zmiany adresu e-mail.');
    }
  };

  // Zmiana hasła
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert('Hasła nie są zgodne.');
      return;
    }

    try {
      await axios.patch(
        'https://ordermanagement-production-0b45.up.railway.app:8080/api/users/change-password/',
        { old_password: oldPassword, new_password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Hasło zostało zaktualizowane.');
      setPasswordFormVisible(false);
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Wystąpił błąd podczas zmiany hasła.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-screen mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      {/* Sekcja 1 - Dane do faktury */}
      <div className="w-full md:w-1/2 p-4 border-r border-gray-300">
        <h2 className="text-xl font-bold mb-4">Dane do faktury</h2>
        <p className="mb-4">
          <strong>Email:</strong> {profileData.email}
        </p>
        <div className="mb-4">
          <label className="block font-semibold">Pełna nazwa firmy:</label>
          <input
            type="text"
            value={profileData.invoice_name}
            onChange={(e) => setProfileData({ ...profileData, invoice_name: e.target.value })}
            className="w-full px-4 py-2 mt-1 border rounded-md bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">NIP:</label>
          <input
            type="text"
            value={profileData.nip}
            onChange={(e) => setProfileData({ ...profileData, nip: e.target.value })}
            className="w-full px-4 py-2 mt-1 border rounded-md bg-white"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Adres siedziby firmy:</label>
          <textarea
            value={profileData.company_address}
            onChange={(e) => setProfileData({ ...profileData, company_address: e.target.value })}
            className="w-full px-4 py-2 mt-1 border rounded-md bg-white"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Zaktualizuj
        </button>
      </div>

      {/* Sekcja 2 - Zmień email / Zmień hasło */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Zarządzaj kontem</h2>

        {/* Zmień email */}
        <div className="mb-6">
          <button
            onClick={() => setEmailFormVisible(!emailFormVisible)}
            className="underline bg-gray-300"
          >
            Zmień email
          </button>
          {emailFormVisible && (
            <div className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Nowy adres email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white"
              />
              <input
                type="email"
                placeholder="Potwierdź nowy adres email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white"
              />
              <button
                onClick={handleChangeEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Wyślij
              </button>
            </div>
          )}
        </div>

        {/* Zmień hasło */}
        <div>
          <button
            onClick={() => setPasswordFormVisible(!passwordFormVisible)}
            className="underline bg-gray-300"
          >
            Zmień hasło
          </button>
          {passwordFormVisible && (
            <div className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="Stare hasło"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white"
              />
              <input
                type="password"
                placeholder="Nowe hasło"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white"
              />
              <input
                type="password"
                placeholder="Potwierdź nowe hasło"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md bg-white"
              />
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Wyślij
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
