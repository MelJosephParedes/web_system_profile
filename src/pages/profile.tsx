import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User {
  name: string;
  email: string;
  bio?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <div>
      <h2>Profile</h2>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : user && (
        <>
          <h1><p>Name: {user.name}</p></h1>
          <p>Email: {user.email}</p>
          {user.bio && <p>Bio: {user.bio}</p>}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
