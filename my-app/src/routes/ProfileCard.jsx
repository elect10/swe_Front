import styled from "styled-components";
import data from "../data.js";
import { useNavigate } from "react-router-dom";
import EvaluationBar from "./EvaluationBar.jsx";
import { VscAccount } from "react-icons/vsc";

const ProfilePic = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 148px;
  top: 25px;
  background-image: url("https://i.imgur.com/8Km9tLL.png");
  background-size: cover;
  background-position: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: 20;
`;

const StyledProfilePic = styled(VscAccount)`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 148px;
  top: 40px;
  background-position: center;
  color: #666;
`;

const Card = styled.div`
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  width: 300px;
  height: 200px;
  margin: 10px auto 2px;
  background: #eeeeee;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const Info = styled.p`
  color: #666;
  font-size: 14px;
  margin: 3px 0 5px;
`;

const InfoName = styled.p`
  color: #666;
  font-size: 18px;
  font-weight: 600;
  margin: 3px 0 5px;
`;
const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: -105px;
  background-color: transparent;
  color: #666;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  margin-top: 91px;
`;

const EvalTitle = styled.p`
  color: #666;
  font-size: 14px;
  margin: 10px 0 5px;
  text-align: left;
`;

export default function ProfileCard() {
  const navigate = useNavigate();
  const projectInfo = data[0];

  const EditButtonClick = () => {
    navigate("/accountInformation");
  };

  return (
    <Card>
      <EditButton onClick={EditButtonClick}>Edit My Profile &gt;</EditButton>
      <StyledProfilePic />
      <ProfileInfo>
        <InfoName>{projectInfo.author}</InfoName>
        <Info>{`${projectInfo.location} | ${projectInfo.positions[0]}`}</Info>
      </ProfileInfo>
      <div className="profile-edit"></div>
      <div>
        <EvalTitle>Evaluation</EvalTitle>
      </div>
      <EvaluationBar />
    </Card>
  );
}
