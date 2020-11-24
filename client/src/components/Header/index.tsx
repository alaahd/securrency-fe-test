import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';
import { theme } from '../../styles/theme';

import {
  Web3ReactProvider,
  useWeb3React,
  getWeb3ReactContext,
} from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ConnectorTypes, connectors } from '../../services/web3/connectors';
import { CheckCircleFilled } from '@ant-design/icons';
import {
  shortenEthereumAddress,
  getActiveWallet,
  getNetworkNameFromChainId,
} from '../../utils/index';
import Spin from '../Spin/';
import { CURRENT_WEB3_CONNECTOR_TYPE } from '../../services/web3/constants';
import {
  Layout,
  Menu,
  Button,
  Grid,
  Drawer,
  Space,
  notification,
  Modal,
  List,
  Avatar,
  Typography,
} from 'antd';

const { Header } = Layout;
const { useBreakpoint } = Grid;

// time in milliseconds to provide progressive rendering and smooth transitioning for UI state changes
const SUSPENSE_TIME = 1500;

const StyledHeader = styled(Header)`
  ${theme.layout.pageNoPadding};
  display: flex;
  justify-content: space-between;
  width: 100%;
  .connect-wallet {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    /* width: 100%; */
  }
  .hamburger {
    color: var(--base-10);
    position: absolute;
    right: 0;
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding-left: 0px;
  }
  .ant-menu {
    border-right: 0px;
  }
  .ant-menu-item {
    border-left: 3px solid var(--base-1);
    padding-left: var(--size-xl);
  }
  .ant-menu-item:hover {
    background-color: var(--blue-1);
    border-left: 3px solid var(--blue-6);
  }
`;

const ConnectWallet = styled.div`
  padding-left: var(--size-xl);
`;

const StyledListItem = styled(List.Item)`
  padding: 1rem;
  margin: 1rem 0;
  cursor: pointer;
  border: 2px solid var(--base-1);
  border-bottom: 2px solid var(--base-1) !important;
  &:hover {
    background-color: var(--base-3);
  }
`;

const StyledSelectedListItem = styled(StyledListItem)`
  border: 2px solid var(--base-5);
  border-bottom: 2px solid var(--base-5) !important;
  background-color: var(--base-3);
`;

const StyledWalletSpin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 200px;
`;

const StyledCheckCircleFilled = styled(CheckCircleFilled)`
  color: var(--green-base);
`;

export function WalletSpin({ title = 'Connecting wallet...', size = 'large' }) {
  return (
    <StyledWalletSpin>
      <Space direction="vertical" size="large" align="center">
        <Spin size={size} />
        <Typography.Title level={5}>{title}</Typography.Title>
      </Space>
    </StyledWalletSpin>
  );
}

function AppHeader() {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React();

  const breakpoints = useBreakpoint();
  const desktop = breakpoints.lg;
  const mobile = breakpoints.xs || breakpoints.sm || breakpoints.md;

  const { pathname } = useLocation();
  const { push } = useHistory();

  const initAvailableWallets = [
    {
      title: 'MetaMask',
      icon: 'metamask.svg',
      description:
        'Select your MetaMask wallet to start interacting with this Dapp.',
      selected: false,
      connectorType: ConnectorTypes.Injected,
    },
  ];

  const [availableWallets, setAvailableWallets] = useState(
    initAvailableWallets
  );

  const activeWallet = getActiveWallet(availableWallets);

  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const [disableWalletConnectButton, setDisableWalletConnectButton] = useState<
    boolean
  >(true);

  const [walletSelectionIsVisible, setWalletSelectionIsVisible] = useState<
    boolean
  >(false);
  const [walletInfoPanelIsVisible, setWalletInfoPanelIsVisible] = useState<
    boolean
  >(false);

  // local statuses for wallet activation and deactivation
  const [walletIsActivating, setWalletIsActivating] = useState<boolean>(false);
  const [walletIsDeactivating, setWalletIsDeactivating] = useState<boolean>(
    false
  );
  const [walletConnectDeactivated, setWalletConnectDeactivated] = useState<
    boolean
  >(false);

  const resetWalletSelection = () => setAvailableWallets(initAvailableWallets);

  useEffect(() => {
    if (active) {
      setWalletIsActivating(false);
      setWalletSelectionIsVisible(false);
    }
    return () => {};
  }, [active, initAvailableWallets]);

  // activate wallet connect button after somtime from initial page load
  useEffect(() => {
    setTimeout(() => {
      setDisableWalletConnectButton(false);
    }, SUSPENSE_TIME);
  }, []);

  // *******************************
  // START: wallet selection methods
  // *******************************
  const walletSelectionIsRequired = (): boolean => {
    // return false if wallet is still loading.
    if (active || disableWalletConnectButton || walletIsDeactivating) {
      return false;
    }

    const getSpaceFromPathname = (pathname: string): string => {
      const [space] = pathname.slice(1).split('/');
      return space;
    };

    const space = getSpaceFromPathname(pathname);
    return ['/page2', '/page3'].includes(space);
  };

  const handleWalletSelectionOpen = (): void => {
    setWalletSelectionIsVisible(true);
  };

  const handleWalletSelectionCancel = (): void => {
    setWalletSelectionIsVisible(false);
    resetWalletSelection();
    deactivate();
  };

  const handleWalletSelectionOption = (item: any) => {
    setAvailableWallets(
      availableWallets.map(wallet =>
        wallet.title === item.title
          ? { ...wallet, selected: !wallet.selected }
          : { ...wallet, selected: false }
      )
    );
  };

  const handleWalletSelectionConfirm = () => {
    setWalletIsActivating(true);
    setTimeout(() => {
      const selectedWallet = availableWallets.find(w => w.selected);

      if (selectedWallet && selectedWallet['connectorType']) {
        activate(connectors[selectedWallet.connectorType], error => {
          setWalletIsActivating(false);
          error &&
            error.message &&
            notification.error({
              message: 'Error',
              description: error.message,
              placement: 'topLeft',
            });
        });
      }
    }, SUSPENSE_TIME);
  };
  // *******************************
  // END: wallet selection methods
  // *******************************

  // *******************************
  // START: wallet info methods
  // *******************************
  const handleWalletInfoOpen = () => {
    setWalletInfoPanelIsVisible(true);
  };
  const handleWalletInfoClose = () => {
    setWalletInfoPanelIsVisible(false);
  };
  const handleWalletInfoDisconnect = () => {
    setWalletIsDeactivating(true);
    // kill wallet connect session using a different approach
    if (connector === connectors[ConnectorTypes.WalletConnect]) {
      (connector as any).close();
      localStorage.removeItem('walletconnect');
    } else {
      // injected connector
      deactivate();
    }
    resetWalletSelection();

    // remove connector instance from localstorage
    localStorage.removeItem(CURRENT_WEB3_CONNECTOR_TYPE);

    // progressive rendering to close wallet info modal
    setTimeout(() => {
      handleWalletInfoClose();
    }, SUSPENSE_TIME);
  };
  // *******************************
  // END: wallet info methods
  // *******************************

  //register event handler for Web3ReactDeactivate and WalletConnect-disconnect
  useEffect(() => {
    // we need to check first if the wallet is connected
    if (active) {
      connector?.once('Web3ReactDeactivate', () => {
        setWalletIsDeactivating(true);
        localStorage.removeItem(CURRENT_WEB3_CONNECTOR_TYPE);
      });
    }
  }, [connector, active, walletIsDeactivating]);

  //here we need to throttle the wallet connect deactivation via local state
  useEffect(() => {
    if (walletIsDeactivating) {
      setTimeout(() => {
        setWalletIsDeactivating(false);
        setWalletConnectDeactivated(true);
      }, SUSPENSE_TIME);
    }
    return () => {};
  }, [walletIsDeactivating]);

  // effect to persist connectorType into localstorage
  useEffect(() => {
    if (
      window.localStorage &&
      availableWallets.some(w => w.selected) &&
      active &&
      connector
    ) {
      localStorage.setItem(
        CURRENT_WEB3_CONNECTOR_TYPE,
        JSON.stringify(availableWallets.find(w => w.selected)?.connectorType)
      );
    }
  }, [connector, active, availableWallets]);

  // effect to load connector from localstorage
  useEffect(() => {
    const local_storage_current_connector_type = localStorage.getItem(
      CURRENT_WEB3_CONNECTOR_TYPE
    );

    if (
      local_storage_current_connector_type &&
      JSON.parse(local_storage_current_connector_type) in ConnectorTypes &&
      !active &&
      availableWallets.every(w => !w.selected)
    ) {
      const current_connector_type = JSON.parse(
        local_storage_current_connector_type
      );

      // hydrate the props of selected wallet
      setAvailableWallets(
        availableWallets.map(w => {
          if (w.connectorType === current_connector_type) {
            return {
              ...w,
              selected: true,
            };
          }

          return w;
        })
      );

      if (current_connector_type === ConnectorTypes.Injected) {
        activate(connectors[ConnectorTypes.Injected]);
      } else if (current_connector_type === ConnectorTypes.WalletConnect) {
        activate(
          connectors[ConnectorTypes.WalletConnect],
          error => console.log(error),
          true
        ).catch(error => {
          console.log(error);
        });
      }
    }
  }, [activate, active, availableWallets]);

  interface IMenuDirection {
    direction?:
      | 'horizontal'
      | 'vertical'
      | 'vertical-left'
      | 'vertical-right'
      | 'inline'
      | undefined;
  }

  const RenderMenuWithItems = ({
    direction = 'horizontal',
  }: IMenuDirection) => {
    return (
      <Menu
        mode={direction}
        onClick={event =>
          direction === 'vertical' && event.key && setDrawerIsOpen(false)
        }
      >
        <Menu.Item key="1">
          <NavLink exact activeClassName="Navbar-active" to="/">
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink exact activeClassName="Navbar-active" to="/page2">
            Page2
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink exact activeClassName="Navbar-active" to="/page3">
            Page3
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink exact activeClassName="Navbar-active" to="/page4">
            Page4
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink exact activeClassName="Navbar-active" to="/page5">
            Page5
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <StyledHeader>
        {desktop ? (
          <>
            <RenderMenuWithItems />
            <ConnectWallet className="connect-wallet">
              {active ? (
                <Button size="large" onClick={handleWalletInfoOpen}>
                  <Space direction="horizontal">
                    <Avatar
                      src={`/images/${
                        availableWallets.find(w => w.selected)?.icon
                      }`}
                    />
                    {account && shortenEthereumAddress(account)}
                    <StyledCheckCircleFilled />
                  </Space>
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleWalletSelectionOpen}
                  disabled={
                    disableWalletConnectButton ||
                    walletIsActivating ||
                    walletIsDeactivating ||
                    active
                  }
                >
                  Connect a wallet
                </Button>
              )}
            </ConnectWallet>
          </>
        ) : (
          mobile && (
            <>
              <Button
                className="hamburger"
                type="link"
                icon={
                  <MenuOutlined
                    style={{ fontSize: '24px', paddingTop: '10px' }}
                  />
                }
                size="large"
                onClick={() => setDrawerIsOpen(true)}
              />
              <StyledDrawer
                placement="right"
                closable={true}
                onClose={() => setDrawerIsOpen(false)}
                visible={drawerIsOpen}
                maskClosable={true}
              >
                <>
                  <Space direction="vertical" size="large">
                    <RenderMenuWithItems direction="vertical" />
                    <ConnectWallet>
                      <Button type="primary" size="large">
                        Connect a wallet
                      </Button>
                    </ConnectWallet>
                  </Space>
                </>
              </StyledDrawer>
            </>
          )
        )}
      </StyledHeader>

      {/* START: Wallet Selection Panel */}
      <Modal
        visible={walletSelectionIsRequired() || walletSelectionIsVisible}
        title="Choose your wallet ..."
        onCancel={handleWalletSelectionCancel}
        transitionName="fade"
        footer={[
          walletSelectionIsRequired() ? (
            <Button key="back" onClick={() => push('/')}>
              Back to Homepage
            </Button>
          ) : (
            <Button key="back" onClick={handleWalletSelectionCancel}>
              Cancel
            </Button>
          ),
          <Button
            type="primary"
            key="submit"
            disabled={availableWallets.every(w => w.selected === false)}
            onClick={handleWalletSelectionConfirm}
            loading={walletIsActivating}
          >
            Add Wallet
          </Button>,
        ]}
      >
        <Typography.Title level={4}>
          Select a wallet to begin trading.
        </Typography.Title>
        {walletIsActivating ? (
          <WalletSpin />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={availableWallets}
            renderItem={item =>
              item.selected ? (
                <StyledSelectedListItem
                  onClick={() => handleWalletSelectionOption(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`/images/${item.icon}`} />}
                    title={item.title}
                    description={item.description}
                  />
                </StyledSelectedListItem>
              ) : (
                <StyledListItem
                  onClick={() => handleWalletSelectionOption(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={`/images/${item.icon}`} />}
                    title={item.title}
                    description={item.description}
                  />
                </StyledListItem>
              )
            }
          />
        )}
      </Modal>
      {/* END: Wallet Selection Panel */}

      {/* START: Disconnect Wallet Panel */}
      <Modal
        visible={
          walletInfoPanelIsVisible ||
          (walletIsDeactivating && !walletConnectDeactivated)
        }
        title="Your wallet"
        onCancel={handleWalletInfoClose}
        transitionName="fade"
        footer={[
          <Button key="back" onClick={handleWalletInfoClose}>
            Cancel
          </Button>,
          <Button
            type="primary"
            key="submit"
            disabled={!active}
            onClick={handleWalletInfoDisconnect}
            loading={!active}
          >
            {active ? 'Disconnect' : 'Disconnecting...'}
          </Button>,
        ]}
      >
        {active ? (
          <Space
            size="large"
            direction="vertical"
            align="center"
            style={{ width: '100%' }}
          >
            {activeWallet ? (
              <div>
                <Avatar src={`/images/${activeWallet?.icon}`} />
                {` `}
                {activeWallet.title}
                {` - `}
                {chainId && getNetworkNameFromChainId[chainId]}
              </div>
            ) : (
              ''
            )}

            <p>{account}</p>
          </Space>
        ) : (
          <WalletSpin title="Disconnecting wallet..." />
        )}
      </Modal>
      {/* END: Disconnect Wallet Panel */}
    </>
  );
}

export default AppHeader;
