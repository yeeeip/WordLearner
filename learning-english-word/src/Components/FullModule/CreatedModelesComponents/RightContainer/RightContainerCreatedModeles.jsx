import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Pagination, TextField, Stack } from "@mui/material";
import './RightContainerCreatedModeles.css';

const RightContainerCreatedModeles = () => {
  const [posts, setPosts] = useState([]); // Все данные
  const [filteredPosts, setFilteredPosts] = useState([]); // Отфильтрованные данные
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();

  const SERVER_URL = process.env.REACT_APP_BACKEND_URL

  // Инициализация данных пользователя из localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('dataUser'));
    setUserRole(userData?.role);
    setUserToken(userData?.token);
  }, []); // Этот useEffect сработает только при монтировании компонента

  // Запрос данных при получении userToken
  useEffect(() => {
    if (userToken) {
      axios.get(`${SERVER_URL}word-learner/api/v1/modules`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then(({ data }) => {
        setPosts(data);
        setFilteredPosts(data);
        setPageQty(Math.ceil(data.length / 9));
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
      });
    }
  }, [userToken]); // Выполнится только если userToken изменится

  // Фильтрация данных на основе поискового запроса
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.wordCount.toString().includes(query)
    );
    setFilteredPosts(filtered);
    setPage(1);
  }, [query, posts]);

  const clikCreateModule = () => {
    navigate(`/createModel/${userRole}`);
  };

  const clikGoOver = (id) => {
    localStorage.setItem("idModule", JSON.stringify(id));
    navigate(`/moduleOverview/${userRole}`);
  };

  return (
    <div>
      <Container sx={{ marginTop: 5, maxWidth: 0 }} maxWidth="md">
        <div className="full-modules-textField">
          <TextField
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              variant="outlined"
              placeholder="Введите название модуля"
          />
        </div>
        <div className="full-modules-title-button">
          <h1 className="full-modules-title">Список модулей</h1>
        </div>

        <Stack spacing={2}>
          <div className="container-full-modules">
            {filteredPosts.slice((page - 1) * 9, page * 9).map((post) => (
              <div key={post.objectID} className="block-full-module">
                <span className="block-full-module-title">{post.title}</span>
                <div className="block-full-module-date">
                  <span className="block-full-module-info">{post.wordCount} слов</span>
                  <div className="block-full-module-line"></div>
                  <span className="block-full-module-info">
                    Создано: {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div onClick={() => clikGoOver(post.id)} className="block-full-module-cell">
                  Перейти
                </div>
              </div>
            ))}
          </div>

          {!!filteredPosts.length && (
            <Pagination
              count={Math.ceil(filteredPosts.length / 9)}
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
