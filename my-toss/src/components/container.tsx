import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ContainerMetadata 인터페이스
interface ContainerMetadata {
  id: number;
  code_name: string;
  title: string;
  type?: string;
  company?: string;
  children?: any;  // JSONField에 대한 타입은 any로 지정, 더 정확한 타입 지정 필요시 수정
  tenant_id: number;
}

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

  // 데이터를 웹페이지에 렌더링하는 방법
  return (
    <div>
      {containerData.map((data: ContainerMetadata) => (
        <div key={data.id}>
          <h1>{data.title}</h1>
          {/* 여기에 children 데이터를 렌더링하는 로직 추가 */}
        </div>
      ))}
    </div>
  );
};

export default Container;
