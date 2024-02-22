import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

// ContainerMetadata 인터페이스
interface ContainerMetadata {
  id: number;
  code_name: string;
  title: string;
  type?: string;
  company?: string;
  children?: any; // JSONField에 대한 타입은 any로 지정
  tenant_id: number;
}

// Styled Components
const ContainerWrapper = styled.div`
  position: absolute;
  bottom:90vh;
  left:350px;
  border-radius: 8px; // 둥근 모서리를 추가합니다
`;

const Title = styled.h1`
    text-align: left;
    color: #333; // 제목 색상을 설정합니다
`;

// Container 컴포넌트
const Container: React.FC = () => {
  const [containerData, setContainerData] = useState<ContainerMetadata[]>([]);

  useEffect(() => {
    axios.get('/api/container-metadata/')
      .then(response => {
        setContainerData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the container metadata', error);
      });
  }, []);

  return (
    <ContainerWrapper>
      {containerData.map((data: ContainerMetadata) => (
        <div key={data.id}>
          <Title>{data.title}</Title>
          {/* children 데이터를 렌더링하는 로직 추가 */}
        </div>
      ))}
    </ContainerWrapper>
  );
};

export default Container;
