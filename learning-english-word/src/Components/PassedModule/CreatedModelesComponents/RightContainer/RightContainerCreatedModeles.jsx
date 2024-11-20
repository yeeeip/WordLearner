import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Pagination, Stack, TextField, CircularProgress } from "@mui/material";
import './RightContainerCreatedModeles.css';

const RightContainerCreatedModeles = () => {
  const [posts, setPosts] = useState([]);  // Все загруженные данные
  const [filteredPosts, setFilteredPosts] = useState([]);  // Отфильтрованные данные
  const [query, setQuery] = useState("");  // Поисковый запрос
  const [page, setPage] = useState(1);  // Текущая страница
  const [pageQty, setPageQty] = useState(0);  // Количество страниц
  const [isLoading, setIsLoading] = useState(true);  // Статус загрузки

  const [userRole, setUserRole] = useState(JSON.parse(localStorage.getItem('dataUser')).role);
  const [userToken, setuserToken] = useState(JSON.parse(localStorage.getItem('dataUser'))?.token);

  const [data, setData] = useState([]); // Инициализация как пустой массив

  const SERVER_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  // Пагинация данных
  const pagination = (data) => {
    const pageSize = 9;  // Количество элементов на одной странице
    let paginatedData = [];
    const totalPages = Math.ceil(data.length / pageSize);

    for (let i = 0; i < totalPages; i++) {
      paginatedData.push(data.slice(i * pageSize, (i + 1) * pageSize));
    }

    return paginatedData;
  };

  // Загружаем данные с сервера
  useEffect(() => {
    setuserToken(JSON.parse(localStorage.getItem('dataUser'))?.token)
    setIsLoading(true);
    axios.get(`${SERVER_URL}word-learner/api/v1/modules/completed`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    })
    .then(({ data }) => {
      console.log(data);
      setData(data);  // Обрабатываем data.modules, если оно есть
      const paginatedData = pagination(data.modules || []);  // Пагинируем данные
      setPosts(paginatedData);  // Сохраняем все данные
      setFilteredPosts(paginatedData);  // Изначально отображаем все данные
      setPageQty(paginatedData.length);  // Устанавливаем количество страниц
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [userToken]);

  // Фильтрация данных на основе поискового запроса
  useEffect(() => {
    const filtered = posts.flat().filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.wordCount.toString().includes(query)
    );

    const paginatedFilteredData = pagination(filtered);
    setFilteredPosts(paginatedFilteredData);  // Обновляем отфильтрованные данные
    setPageQty(paginatedFilteredData.length);  // Обновляем количество страниц для фильтрованных данных
    setPage(1);  // Сбрасываем страницу на 1 при изменении запроса
  }, [query, posts]);

  // Обработчик изменения страницы
  const handlePageChange = (_, num) => {
    setPage(num);
  };

  // Переход к созданию нового модуля
  const clikCreateModule = () => {
    navigate(`/createModel/${userRole}`);
  };

  // Переход к детальному просмотру модуля
  const clikGoOver = (id) => {
    localStorage.setItem("idModule", JSON.stringify(id));
    console.log(userRole)
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
            onChange={(event) => setQuery(event.target.value)}  // Обновляем поисковый запрос
            variant="outlined"
            placeholder="Введите название модуля"
          />
        </div>

        <div className="created-modules-title-button">
          <h1 className="created-modules-title">Пройденные модули</h1>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Загрузка...</p>
          </div>
        ) : (
          <Stack spacing={2}>
            <div className="container-created-modules">
              {data.map((post) => (
                <div key={post.objectID} className="block-created-module">
                  <span className="block-created-module-title">{post.title}</span>
                  <div className="block-created-module-date">
                    <span className="block-created-module-info">{post.result}/{post.wordCount} cлов</span>
                    <div className="block-created-module-line"></div>
                    <span className="block-created-module-info">
                      Пройдено: {new Date(post.lastSubmission).toLocaleDateString('ru-RU', {
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
                count={pageQty}  // Количество страниц для фильтрованных данных
                page={page}
                onChange={handlePageChange}  // Обработчик изменения страницы
                hidePrevButton
                hideNextButton
                sx={{ marginY: 3, marginX: "auto" }}
              />
            )}
          </Stack>
        )}
      </Container>
    </div>
  );
};

export default RightContainerCreatedModeles;
