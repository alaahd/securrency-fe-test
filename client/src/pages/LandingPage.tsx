import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Table,
  Space,
  Button,
  Modal,
  Col,
  Row,
  Statistic,
  Divider,
  notification,
} from 'antd';
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import Base from '../layout/Base';
import { WalletSpin } from '../components/Header';
import { getNetworkNameFromChainId } from '../utils/index';
import { useContract } from '../hooks/useContract';
import { ABI } from '../abis/FETestTask';

const StyledTable = styled(Table)`
  .ant-table-container {
    padding: 0.5rem 1.25rem;
  }
`;
interface IProps {}

const LandingPage: React.FC<IProps> = () => {
  const { REACT_APP_CONTRACT_ADDRESS } = process.env;

  const [activeNetwork, setActiveNetwork] = useState<string>('');
  const [showCitizenNotesModal, setShowCitizenNotesModal] = useState<boolean>(
    false
  );
  const initCitizenData = { note: '' };
  const [citizenId, setCitizenId] = useState<number>(0);
  const [citizenData, setCitizenData] = useState<any>(initCitizenData);

  const { data: results, error } = useSWR('/worker');
  const loading = !error && !results;
  const { active, account, chainId } = useWeb3React();
  const contract = useContract(REACT_APP_CONTRACT_ADDRESS, ABI);

  useEffect(() => {
    if (active && account && chainId) {
      setActiveNetwork(getNetworkNameFromChainId[chainId]);
    }
  }, [active, account, chainId]);

  useEffect(() => {
    if (contract && citizenData && citizenData.key) {
      (async () => {
        try {
          const citizenNote = await contract.getNoteByCitizenId(
            citizenData.key
          );
          setCitizenData({
            ...citizenData,
            note: citizenNote,
          });
        } catch (error) {
          notification.error({
            message: 'Error communicating with the smart contract !',
            description: error && error.message ? error.message : '',
            placement: 'topLeft',
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, citizenId]);

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
          <Button
            type="link"
            onClick={() => {
              setShowCitizenNotesModal(true);
              setCitizenId(record.key);
              setCitizenData({ ...initCitizenData, ...record });
            }}
          >
            Show Notes
          </Button>
        </Space>
      ),
    },
  ];

  const data = results
    ? results.map((citizen: any) => ({
        key: citizen.id,
        name: citizen.name,
        age: citizen.age,
        address: 'Abu Dhabi',
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

  const handleCloseModal = () => {
    setShowCitizenNotesModal(false);
    setCitizenData(initCitizenData);
  };

  return (
    <Base
      title="List of Securrency registered citizens"
      subTitle={SubtitleComponent}
    >
      <StyledTable loading={loading} columns={columns} dataSource={data} />
      {/* START: Disconnect Wallet Panel */}
      <Modal
        visible={showCitizenNotesModal}
        title="Citizen Details and Information"
        onCancel={handleCloseModal}
        transitionName="fade"
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <Row gutter={12}>
          <Col span={6}>
            <Statistic
              title="Name"
              value={citizenData && citizenData.name ? citizenData.name : '...'}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="City"
              value={
                citizenData && citizenData.address ? citizenData.address : '...'
              }
            />
          </Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={6}>
            <Statistic
              title="Age"
              value={citizenData && citizenData.age ? citizenData.age : '...'}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Id"
              value={citizenData && citizenData.key ? citizenData.key : '...'}
            />
          </Col>
          <Col span={12}>
            <Divider />
          </Col>
          <Col span={12}>
            {citizenData && citizenData.note ? (
              <Statistic
                title="Notes"
                value={
                  citizenData && citizenData.note ? citizenData.note : '...'
                }
              />
            ) : (
              <WalletSpin size="medium" title="Fetching On-Chain data..." />
            )}
          </Col>
        </Row>
      </Modal>
      {/* END: Disconnect Wallet Panel */}
    </Base>
  );
};

export default LandingPage;
