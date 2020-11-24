import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Typography } from 'antd';
const { Text, Title } = Typography;

const PageSubHeader = styled.div`
  ${theme.layout.page};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function AppPageSubHeader({ title, subTitle: SubTitle, action: Action }: any) {
  return (
    <PageSubHeader>
      <Wrapper>
        <Title style={{ color: '#FFFFFF' }} level={2}>
          {title}
        </Title>
        <Action />
      </Wrapper>
      <Text style={{ color: '#FFFFFF' }}>
        <SubTitle />
      </Text>
    </PageSubHeader>
  );
}

export default AppPageSubHeader;
