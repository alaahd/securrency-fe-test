import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Space, Button } from 'antd';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import Base from '../layout/Base';
import { getNetworkNameFromChainId } from '../utils/index';

const StyledTable = styled(Table)`
  .ant-table-container {
    padding: 0.5rem 1.25rem;
  }
`;
interface IProps {}

const LandingPage: React.FC<IProps> = () => {
  const { data: results, error } = useSWR('/worker');
  const loading = !error && !results;
  const { active, account, chainId } = useWeb3React();

  const [activeNetwork, setActiveNetwork] = useState<string>('');

  useEffect(() => {
    if (active && account && chainId) {
      setActiveNetwork(getNetworkNameFromChainId[chainId]);
    }
  }, [active, account, chainId]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a href="/">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'City',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="link">Show Notes</Button>
        </Space>
      ),
    },
  ];

  const data = results
    ? results.map((citizen: any) => ({
        key: citizen.id,
        name: citizen.name,
        age: citizen.age,
        address: 'New York No. 1 Lake Park',
      }))
    : [];

  const SubtitleComponent = () => {
    return (
      <>
        <span>
          All information below are fetched onchain using a worker service with
          60s caching, you are connected to:{' '}
        </span>
        <strong>{loading ? '...' : activeNetwork}</strong>
      </>
    );
  };
  return (
    <Base
      title="List of Securrency registered citizens"
      subTitle={SubtitleComponent}
    >
      <StyledTable loading={loading} columns={columns} dataSource={data} />
    </Base>
  );
};

export default LandingPage;
