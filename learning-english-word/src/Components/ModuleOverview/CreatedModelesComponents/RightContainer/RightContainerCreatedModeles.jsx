import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Link as NavLink, useNavigate } from "react-router-dom";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import './RightContainerCreatedModeles.css'
import {
  Container,
  Pagination,
  PaginationItem,
  TextField,
  Stack,
  Link
} from "@mui/material";

const BASE_URL = "http://hn.algolia.com/api/v1/search?";

const RightContainerCreatedModeles = (props) => {
  console.log(props);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
  const [idModule, setIdModule] = useState(JSON.parse(localStorage.getItem('idModule')));
  const navigate = useNavigate()
  const SERVER_URL = process.env.REACT_APP_BACKEND_URL

  const pagination = (data) => {
    let paginationLength = data.length;
    const finishResultData = [];
    let modifiedEndElement = 9;
    let modifiedInitElement = 0;

    while (modifiedInitElement < paginationLength) {
      finishResultData.push(data.slice(modifiedInitElement, modifiedEndElement));
      modifiedInitElement += 9;
      modifiedEndElement += 9;
    }

    return finishResultData;
  };

  useEffect(() => {
    setuserToken(JSON.parse(localStorage.getItem('dataUser')).token);
    axios.get(`${SERVER_URL}word-learner/api/v1/modules/${idModule}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then(({ data }) => {
      console.log(data);

      const paginatedData = pagination(data.words);
      setDescription(data.description)
      setTitle(data.title);
      setPosts(paginatedData);
      setPageQty(paginatedData.length);
      if (data.nbPages < page) {
        setPage(1);
      }
    });
  }, [query, page, userToken, idModule]);

    // useEffect(() => {
  //   axios.get(BASE_URL + query=${query}&page=${page - 1}).then(({ data }) => {
  //     console.log(data)
  //     setPosts(data.hits);
  //     setPageQty(data.nbPages);
  //     console.log(posts)
  //     pagination(data);
  //     if (data.nbPages < page) {
  //       setPage(1);
  //     }
  //   });
  // }, [query, page]);

  const clikCreateModule = () => {
    setUserRole( JSON.parse(localStorage.getItem('dataUser')).role);
    navigate(`/createModel/${userRole}`);
  }
  

  const clikTest = () => {
    navigate(`/test`);
  }
  const clikMath = () => {
    navigate(`/match`);
  }
  const clikCards = () => {
    navigate(`/cards`);
  }

  useEffect(() => {
    console.log(posts); // Логируем posts после их обновления
  }, [posts]);

  return (
    <div>
      <Container sx={{ marginTop: 5, maxWidth: 0}} maxWidth="md">
        {/* <TextField
          fullWidth
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        /> */}
        <div className="overview-modules-title-description">
          <h1 className="overview-modules-title">{title}</h1>
          <span className="overview-modules-description">{description}</span>
          <div className="overview-modules-tasks">
            <div className="overview-modules-task" onClick={clikCards}>Карточки</div>
            <div className="overview-modules-task" onClick={clikMath}>Подбор</div>
            <div className="overview-modules-task" onClick={clikTest}>Тест</div>
          </div>
        </div>
        <Stack spacing={2}>
          <div className="container-overview-modules">
            {posts[page - 1]?.map((post) => (
              <div key={post.objectID} href={post.url} className="block-overview-module">
                  <span className="block-overview-module-info">{post.wordEn} - {post.wordRu}</span>
              </div>
            ))}
          </div>

          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
              hidePrevButton 
              hideNextButton 
              sx={{ marginY: 3, marginX: "auto" }}
            />
          )}
        </Stack>
      </Container>
    </div>
    
  );
};

export default RightContainerCreatedModeles;
