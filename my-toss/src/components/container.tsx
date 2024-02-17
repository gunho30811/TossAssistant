// Container.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

// Styled components
const ContainerWrapper = styled.div`
  /* 스타일 정의 */
`;

const MainTitle = styled.h1`
  /* 메인 타이틀 스타일 */
`;

const CenterList = styled.div`
  /* 센터 목록 스타일 */
`;

const CenterItem = styled.div`
  /* 개별 센터 아이템 스타일 */
`;

// TypeScript 인터페이스 정의
interface Center {
  id: number;
  name: string;
  records: Record[];
}

interface Record {
  id: number;
  title: string;
  // 필요한 다른 필드들...
}

const Container: React.FC = () => {
  const [mainTitle, setMainTitle] = useState<string>('');
  const [centers, setCenters] = useState<Center[]>([]);

  useEffect(() => {
    // 백엔드에서 container_metadata 데이터 가져오기
    axios.get('/api/container-metadata/')
      .then(response => {
        const data = response.data[0]; // 예시로 첫 번째 데이터 사용
        setMainTitle(data.title); // 메인 타이틀 설정
        // 자식 센터 데이터 설정 (실제 API 구조에 따라 변경 필요)
        setCenters(data.children.map((child: any) => ({
          id: child.id,
          name: child.name,
          records: child.tableRecords
        })));
      })
      .catch(error => {
        console.error('There was an error fetching the container metadata', error);
      });
  }, []);

  return (
    <ContainerWrapper>
      <MainTitle>{mainTitle}</MainTitle>
      <CenterList>
        {centers.map(center => (
          <CenterItem key={center.id}>
            <h2>{center.name}</h2>
            {/* 여기에 센터별 테이블 레코드 출력 */}
          </CenterItem>
        ))}
      </CenterList>
    </ContainerWrapper>
  );
};

export default Container;
