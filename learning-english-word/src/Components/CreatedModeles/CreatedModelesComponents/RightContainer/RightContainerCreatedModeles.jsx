import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Pagination, TextField, Stack } from "@mui/material";
import './RightContainerCreatedModeles.css';

const RightContainerCreatedModeles = () => {
  const [posts, setPosts] = useState([]); // Все данные
  const [filteredPosts, setFilteredPosts] = useState([]); // Отфильтрованные данные
  const [query, setQuery] = useState(""); // Поисковый запрос
  const [page, setPage] = useState(1); // Текущая страница
  const [pageQty, setPageQty] = useState(0); // Количество страниц
  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);
  const navigate = useNavigate();
  const SERVER_URL = process.env.REACT_APP_BACKEND_URL

  // Пагинация данных
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

  // Загружаем данные с сервера
  useEffect(() => {
    setuserToken(JSON.parse(localStorage.getItem('dataUser')).token)
    axios.get(`${SERVER_URL}word-learner/api/v1/modules/created`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then(({ data }) => {
      console.log(data);
      const paginatedData = pagination(data); // Пагинируем данные
      setPosts(paginatedData); // Сохраняем все данные
      setFilteredPosts(paginatedData); // Изначально отображаем все данные
      setPageQty(Math.ceil(data.length / 9)); // Обновляем количество страниц
    }).catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
  }, [userToken]);

  // Фильтруем данные на основе поискового запроса
  useEffect(() => {
    const filtered = posts.flat().filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.wordCount.toString().includes(query)
    );
    const paginatedFilteredData = pagination(filtered);
    setFilteredPosts(paginatedFilteredData); // Обновляем отфильтрованные данные
    setPageQty(paginatedFilteredData.length); // Обновляем количество страниц для фильтрованных данных
    setPage(1); // Сбрасываем страницу на 1 при изменении запроса
  }, [query, posts]);

  // Переход к созданию нового модуля
  const clikCreateModule = () => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
    navigate(`/createModel/${userRole}`);
  };

  // Переход к детальному просмотру модуля
  const clikGoOver = (id) => {
    setUserRole(JSON.parse(localStorage.getItem('dataUser')).role)
    localStorage.setItem("idModule", JSON.stringify(id));
    navigate(`/moduleOverview/${userRole}`);
  };

  return (
    <div>
      <Container sx={{ marginTop: 5, maxWidth: 0 }} maxWidth="md">
        {/* Поле для поиска */}
        <div className="full-modules-textField">
          <TextField
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)} // Обновляем запрос
              variant="outlined"
              placeholder="Введите название модуля"
          />
        </div>

        <div className="created-modules-title-button">
          <h1 className="created-modules-title">Созданные модули</h1>
          <div onClick={clikCreateModule} className="created-modules-button">Создать модуль</div>
        </div>

        <Stack spacing={2}>
          <div className="container-created-modules">
            {filteredPosts[page - 1]?.map((post) => (
              <div key={post.objectID} href={post.url} className="block-created-module">
                <span className="block-created-module-title">{post.title}</span>
                <div className="block-created-module-date">
                  <span className="block-created-module-info">{post.wordCount} cлов</span>
                  <div className="block-created-module-line"></div>
                  <span className="block-created-module-info">Создано: {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                  </span>
                </div>
                <div onClick={() => clikGoOver(post.id)} className="block-created-module-cell">
                  Перейти
                </div>
              </div>
            ))}
          </div>

          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)} // Обработчик для изменения страницы
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
