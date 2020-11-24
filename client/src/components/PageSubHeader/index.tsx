import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Typography } from 'antd';
const { Text, Title } = Typography;

const PageSubHeader = styled.div`
  ${theme.layout.page};
`;

function AppPageSubHeader({ title, subTitle: SubTitle }: any) {
  return (
    <PageSubHeader>
      <Title style={{ color: '#FFFFFF' }} level={2}>
        {title}
      </Title>
      <Text style={{ color: '#FFFFFF' }}>
        <SubTitle />
      </Text>
    </PageSubHeader>
  );
}

export default AppPageSubHeader;
