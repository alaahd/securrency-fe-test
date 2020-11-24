import React from 'react';
import styled from 'styled-components';
import { Layout, Typography, Row, Col } from 'antd';
const { Footer } = Layout;
const { Text } = Typography;

const StyledFooter = styled(Footer)`
  .copyright {
    color: var(--base-1);
  }
`;

function AppFooter() {
  return (
    <StyledFooter>
      <Row>
        <Col span={12}>
          <Text className="copyright">
            &#169; {new Date().getFullYear()}&nbsp;Securrency
          </Text>
        </Col>
      </Row>
    </StyledFooter>
  );
}

export default AppFooter;
