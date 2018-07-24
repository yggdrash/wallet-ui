import styled from "styled-components";

export const AccountCard = styled.div`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: #dcdde1
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 7%;
`;


export const NetworkCard = styled.div`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: #dcdde1
  width: 30%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 7%
`;

export const Logo = styled.div`
  width: 4%;
  margin-top:1%;
  margin-left:2.5%;
`;

export const Title = styled.h1`
  color: #508464;
  padding: 1%;
  font-size: 2em;
  margin-top:1.3%;
  margin-left:0.5%;
`;

export const Yeed = styled.div`
  width: 15px;
  margin-left:10px;
  margin-right:7px;
  margin-top:2px;
`;

export const Key = styled.h3`
  color: #508464;
  margin-bottom: 20px !important;
  &:last-child {
    margin-bottom: 0
  }
`;

export const KeyName = styled.span`
  color: #508464;
  display: flex;
`;

export const Button = styled.button`
  border: 0;
  width: 150px;
  height: 5%;
  padding: 10px 0;
  color: #f5f6fa;
  margin-right:10px;
  margin-top:15px;
  margin-bottom:15px;
  background-color: #006266;
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
    background-color: #7f8c8d;
    transform: translateY(1px);
  }
  &:disabled {
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    background-color: #009432;
    transform: none;
    cursor: progress;
    &:focus,
    &:active,
    &:hover {
      transform: none;
    }
  }
`;

