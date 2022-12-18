import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { getTopFollwer } from "../../api/followshipAPI";
import PopularUserCard from "./PopularUserCard";

const StyledListContainer = styled.div`
  grid-column: 3 / 4;
  align-self: flex-start;
  width: calc(100% - 25px);
  margin-left: 25px;
  border-radius: 16px;
  background-color: var(--scale_light-gray);

  h4 {
    padding: 24px;
    margin: 0;
    color: var(--main_text);
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    border-bottom: 1px solid var(--border_gray);
  }
`;

const PopularUserList = () => {
  const [topFollower, setTopFollower] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTopFollwer({ token });
      setTopFollower(data);
    };
    getData();
  }, []);
  return (
    <StyledListContainer>
      <h4>推薦追隨</h4>
      <ul>
        {topFollower.map((top) => (
          <PopularUserCard
            key={top.id}
            avatar={top.avatar}
            name={top.name}
            account={top .account}
            isFollowed={false}
          />
        ))}
      </ul>
    </StyledListContainer>
  );
};

export default PopularUserList;
