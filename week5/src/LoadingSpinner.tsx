import styled from "styled-components";


const Spinner = styled.div`
  border: 16px solid pink;
  border-top: 16px deeppink solid;
  border-radius: 50%;
  height: 70px;
  width: 70px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;