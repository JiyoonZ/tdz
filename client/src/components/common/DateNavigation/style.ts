import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 20px 0;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  svg {
    padding: 0 10px;

    width: 20px;
    height: 20px;

    cursor: pointer;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;

  svg {
    padding: 0;
    width: 12px;
    height: 12px;
  }
`;
