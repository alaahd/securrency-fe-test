import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { theme } from './../styles/theme';
import PageSubHeader from '../components/PageSubHeader';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  /* 100% viewport heigh - (header + footer height) */
  min-height: calc(100vh - 130px);
  position: relative;
  background: var(--styled-masthead-background-color);
`;

const StyledMastHead = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: var(--styled-masthead-height);
  position: absolute;
  width: 100%;
`;

const StyledContent = styled(Content)`
  z-index: 10;
  color: #ffffff;
`;

const Page = styled(Content)`
  ${theme.layout.page};
`;

function Base(props: any) {
  return (
    <StyledLayout>
      <StyledMastHead></StyledMastHead>
      <StyledContent>
        <PageSubHeader
          title={props.title}
          subTitle={props.subTitle}
          action={props.action}
        />
        <Page>{props.children}</Page>
      </StyledContent>
    </StyledLayout>
  );
}

export default Base;
