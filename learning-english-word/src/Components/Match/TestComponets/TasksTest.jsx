import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Link as NavLink, useNavigate } from "react-router-dom";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Container,
  Pagination,
  PaginationItem,
  TextField,
  Stack,
  Link
} from "@mui/material";

const BASE_URL = "http://hn.algolia.com/api/v1/search?";

const TaskTest = (props) => {
  console.log(props);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const userToken = JSON.parse(localStorage.getItem('dataUser'))?.token;
  const userRole = JSON.parse(localStorage.getItem('dataUser')).role;
  const navigate = useNavigate()

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
    axios.get('http://localhost:8080/word-learner/api/v1/modules', {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then(({ data }) => {
      console.log(data);
      const paginatedData = pagination(data);
      setPosts(paginatedData);
      setPageQty(paginatedData.length);
      if (data.nbPages < page) {
        setPage(1);
      }
    });
  }, [query, page, userToken]);

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
    navigate(`/createModel/${userRole}`);
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

        <Stack spacing={2}>
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

export default TaskTest;
