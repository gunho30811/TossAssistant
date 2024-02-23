import React, { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';
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
// 기본 TableMetadata 인터페이스
interface TableMetadata {
    data: any;
    id: number;
    code_name: string;
    title: string;
    type?: string;
    source?: string;
    company?: string;
    columns: TableMetadataColumns; // columns 필드가 TableMetadataColumns 구조를 사용
    tenant_id: number;
  }
    // TableMetadataColumns를 정의하는 방식
interface TableMetadataColumns {
    order: string[];
    columns: { [key: string]: ColumnDetail };
  }

interface ColumnDetail {
    key: string;
    type: string;
    align: string;
    label: string;
    value?: string | number;
    targetContainer?: {
      type: string;
      codeName: string;
    };
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
// Table 컴포넌트
const Table: React.FC<{ metadata: TableMetadata }> = ({ metadata }) => {
    // 컬럼 순서(order)에 따라 컬럼 세부 정보를 정렬합니다.
    const orderedColumns = metadata.columns.order.map(columnKey => metadata.columns.columns[columnKey]);
  
    return (
      <table>
        <thead>
          <tr>
            {orderedColumns.map(column => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metadata.data.map((_row: any, rowIndex: React.Key | null | undefined) => (
            <tr key={rowIndex}>
              {orderedColumns.map(column => (
                <td key={column.key}>
                  {column.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


// Container 컴포넌트
const Container: React.FC = () => {
    const [containerData, setContainerData] = useState<ContainerMetadata[]>([]);
    const [tableMetadatas, setTableMetadatas] = useState<{ [codeName: string]: TableMetadata }>({});
  
    useEffect(() => {
      let source = axios.CancelToken.source();
  
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/container-metadata/', {
            cancelToken: source.token
          });
          const containerData = response.data;
          setContainerData(containerData);
  
          const promises = containerData.map(async (container: ContainerMetadata) => {
            if (container.children && container.children.length > 0) {
              for (const child of container.children) {
                const tableCodeName = child.tableCodeName;
                try {
                  const tableResponse = await axios.get(`/api/table-metadata/${tableCodeName}`, {
                    cancelToken: source.token
                  });
                  const tableMetadata: TableMetadata = tableResponse.data;
                  setTableMetadatas(prev => ({ ...prev, [tableCodeName]: tableMetadata }));
                } catch (error) {
                  console.error(`Error fetching table metadata for ${tableCodeName}`, error);
                }
              }
            }
          });
          await Promise.all(promises);
        } catch (error) {
          if (!axios.isCancel(error)) {
            console.error('There was an error fetching the container metadata', error);
          }
        }
      };
  
      fetchData();
  
      return () => {
        source.cancel('Component unmounted');
      };
    }, []);
  
    return (
      <ContainerWrapper>
        {containerData.map(container => (
          <div key={container.id}>
            <Title>{container.title}</Title>
            {container.children?.map((child: { tableCodeName: string }) => (
              <Table key={child.tableCodeName} metadata={tableMetadatas[child.tableCodeName]} />
            ))}
          </div>
        ))}
      </ContainerWrapper>
    );
  };
  
  export default Container;