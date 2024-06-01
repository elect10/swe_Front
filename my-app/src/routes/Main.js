import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TabBar from "./TabBar";
import PostCard from "./PostCard";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import TechStackPopup from "./components/TechStackPopup";
import TechStackPopup1 from "./components/TechStackPopup1";
import TechStackPopup2 from "./components/TechStackPopup2";
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: #0e442a;
  color: white;
  width: 100vw;
  height: 50px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const Title1 = styled.h1`
  font-size: 20px;
  margin-left: 20px;
`;

const Mainpage = styled.div`
  display: flex;
  flex-direction: column;

  width: 393px;
  height: 852px;
  background: #ffffff;
`;

const PostCardWrapper = styled.div`
  display: flex;
  justify-content: center; // 내부 아이템을 가운데 정렬
  width: 100%; // 폭을 100%로 설정하여 부모 컨테이너의 폭에 맞춤
  margin-bottom: 20px; // 각 카드 아래에 마진 추가
`;

const PostList = styled.div`
  position: relative;
  width: 393px;
  height: 852px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 5%;
  border: none;
  background: rgba(196, 196, 196, 0.2);
  padding: 0;
  margin-bottom: 15px;
  align-self: center;
  border-radius: 10px;
`;

const SearchIcon = styled(CiSearch)`
  margin-left: 10px;
`;

const Searchbox = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  name: "projectname";
`;

const SearchButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 5%;
`;

const SearchButton = styled.button`
    background: rgba(196, 196, 196, 0.2);
    width:22%;
    height: 5%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    margin-left: 3px;
    margin-right: 3px;
    cursor: pointer;
    font-size: 12px;    
    font-weight: 600;
    color: black;
    display: flex;
    justify-content: left;
    align-items: center;
    justify-content: space-between;
    
`;

const FindButton = styled.button`
    // FindButton의 스타일을 정의합니다.
    background: rgba(196, 196, 196, 0.2);
    width:16%; // FindButton의 너비를 설정합니다.
    height: 5%;
    border: none;
    border-radius: 10px;
    padding: 15px;
    margin-left: 3px;
    margin-right: 3px;
    cursor: pointer;
    font-size: 12px;    
    font-weight: 600;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Main = () => {
    // const posts = [
    //     {
    //       title: "SKKU Application",
    //       location: "Suwon",
    //       description:
    //         "We are recruiting developers and designers to join our side project.",
    //       roles: ["Front-end", "Back-end", "Designer"],
    //       recruitingInfo: "Recruiting 1/7",
    //     },
    
    //     // 추가 게시물 정보를 여기에 포함할 수 있습니다.
    //   ];

    // 추가 게시물 정보를 여기에 포함할 수 있습니다.

  const navigate = useNavigate();

  const handleCardClick = async (id) => {
        try {
            const response = await axios.post('/api/post', { id });
            // response를 처리하는 코드를 여기에 추가합니다.
        } catch (error) {
            console.error('Failed to post data:', error);
        }
    };

  const [form, setForm] = useState({
    projectname: "",
    status: true,
    position: 0,
    stack: [],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [selectedStacks, setSelectedStacks] = useState([]);
  const [selectedstatus, setSelectedStatus] = useState(false);
  const [selectedposition, setSelectedPosition] = useState("");

  const handleSelectStack = (stacks) => {
    setSelectedStacks(stacks);
  };

  const handleSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };


    const handleChange_popup = (e) => {
      setSelectedStacks(e.target.value.split(',').map(s => s.trim()));
    };
  
      const handleChange = (e) => {
          const { name, value } = e.target;
          setForm({
          ...form,
          [name]: value,
          });
      };


      const handleFindClick = async () => {
        try {
            setPosts([]);
            const response = await axios.post('/api/search', form);
            // response.data를 posts 상태에 저장합니다.
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    
    const [posts, setPosts] = useState([]);

    
    

    return (
        <Mainpage>
            <Header>
                <Title>SKKU Recruit</Title>
            </Header>
            <Title1>All Projects</Title1>
            <SearchWrapper>
                <SearchIcon />
                <Searchbox name="projectname" placeholder='Search' onChange={handleChange} />
            </SearchWrapper>

            <SearchButtonWrapper>
            <SearchButton onClick={()=>{setShowPopup1(true); setShowPopup(false);setShowPopup2(false);  }}>Status<IoIosArrowDown /></SearchButton>
            {showPopup1 && (
                <TechStackPopup1
                    setForm={setForm}
                    selectedStatus={selectedstatus}
                    onSelect={handleSelectStatus}
                    setShowPopup={setShowPopup1}
                />
                )}
            <SearchButton onClick={()=>{setShowPopup1(false); setShowPopup(false);setShowPopup2(true);  }}>Position<IoIosArrowDown /></SearchButton>
            {showPopup2 && (
                <TechStackPopup2
                    setForm={setForm}
                    selectedPosition={selectedposition}
                    onSelect={handleSelectPosition}
                    setShowPopup={setShowPopup2}
                />
                )}
            <SearchButton onClick={()=>{setShowPopup1(false); setShowPopup(true);setShowPopup2(false);  }}>Tech Stack<IoIosArrowDown /></SearchButton>
            {showPopup && (
                <TechStackPopup
                    setForm={setForm}
                    selectedStacks={selectedStacks}
                    onSelect={handleSelectStack}
                    setShowPopup={setShowPopup}
                />
                )}
            <FindButton onClick={handleFindClick}>Find</FindButton>
            </SearchButtonWrapper>
            {console.log('form:', form)}

            {posts.map((post, index) => (
                <PostCardWrapper key={index} onClick={() => handleCardClick(post.id)}>
                    <PostCard {...post} />
                </PostCardWrapper>
            ))}

            <TabBar></TabBar>
        </Mainpage>
    
        




    );
}

export default Main;