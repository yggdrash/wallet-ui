import styled from "styled-components";

export const Card = styled.div`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  width: 90%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 50px;
`;

export const Logo = styled.div`
// animation: App-logo-spin infinite 10s linear;
// @keyframes App-logo-spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
  width: 3.5%;
`;

export const Title = styled.h1`
  color: #f2f2f2;
  padding: 15px;
  font-size: 1.5em;
`;

export const Key = styled.h3`
  color: #305371;
  margin-bottom: 20px !important;
  &:last-child {
    margin-bottom: 0;3
  }
`;

export const KeyName = styled.span`
  color: #999;
`;

export const Button = styled.button`
  border: 0;
  width: 100px;
  padding: 10px 0;
  color: #305371;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.1s linear;
  cursor: pointer;
  &:focus,
  &:active {
    outline: none;
  }
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #f6f9fc;
    transform: translateY(1px);
  }
  &:disabled {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #f6f9fc;
    transform: none;
    cursor: progress;
    &:focus,
    &:active,
    &:hover {
      transform: none;
    }
  }
`;
