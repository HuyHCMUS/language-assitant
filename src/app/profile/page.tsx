'use client'

import React from 'react';
import { useEffect} from "react";
import { useRouter } from 'next/navigation';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from '@/components/profile/ProfileCard';
//import ActivityLog from '@/components/profile/ActivityLog';
import {User} from '../../types/auth'

import { useAuth } from '@/contexts/AuthContext';


// type Activity = {
//   id: number;
//   type: 'lesson' | 'quiz' | 'practice';
//   title: string;
//   date: string;
// };

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth(); // const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);


  // Mock data - sau này sẽ lấy từ API
  const storedUser = localStorage.getItem('user');
  const userProfile: User = storedUser ? JSON.parse(storedUser) : ({} as User);
  
  // const activities: Activity[] = [
  //   {
  //     id: 1,
  //     type: 'lesson',
  //     title: 'Hoàn thành bài học Listening Basic 01',
  //     date: '2024-01-20T08:30:00Z'
  //   },
  //   {
  //     id: 2,
  //     type: 'quiz',
  //     title: 'Đạt 90% bài kiểm tra từ vựng',
  //     date: '2024-01-19T15:45:00Z'
  //   },
  //   {
  //     id: 3,
  //     type: 'practice',
  //     title: 'Luyện tập phát âm 30 phút',
  //     date: '2024-01-19T10:20:00Z'
  //   }
  // ];

  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render null khi chưa login
  if (!isLoggedIn) {
    return null;
  }
  
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={4}>
          <ProfileCard 
            profile={userProfile}
            onUpdate={(data) => console.log('Update profile:', data)}
          />
        </Col>
        {/* <Col lg={8}>
          <ActivityLog activities={activities} />
        </Col> */}
      </Row>
    </Container>
  );
} 