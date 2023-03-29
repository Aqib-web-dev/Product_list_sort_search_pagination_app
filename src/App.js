import {useState, useEffect} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  margin-top: 16px;
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #39a359;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 8px;
  background-color: #a34039;
`;

const TableCell = styled.td`
  text-align: left;
  padding: 8px;
`;

const StyledForm = styled.form`
  margin: auto;
  padding: 15px;
  max-width: 400px;
  align-content: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #415fa6;
  border-radius: 5px;
  background-color: #f1f1f1;
  color: #333;
  margin-right: 8px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 8px;
  
  &:hover {
    background-color: #3e8e41;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${props => props.isMargin ? '15px': 0};
`;

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
  const [errorState, setErrorState] = useState('');

  const loadProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const result = await response.json();
      setData(result.products);
      setCurrentPageData(result.products);
    }
    catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadProducts();
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery.length < 3) {
      setCurrentPageData([]);
      setErrorState('Search text should be at least 3 characters long'); 
      console.log('handle submit')
    }
    else {
      const results = data.filter((item) => {
        const title = item.title.toLowerCase();
        const query = item.searchQuery.toLowerCase();
        return title.includes(query);
      })
      if (results.length !== 0) {
        setCurrentPageData(results);
        setErrorState('');
      }
      else {
        setCurrentPageData([]);
        setErrorState('No results Found');
      } 
    }
  };

  const handleSearchInput = (e) => {
    let text = e.target.value;
    setSearchQuery(text);
  }

  const handleReset = ( ) => {
      setErrorState('');
      loadProducts();
  }

  console.log(currentPageData);

  return (
    <>
      <Container>
        <StyledForm onSubmit={handleSubmit}>
          <Wrapper>
            <StyledInput
              placeholder='Search product'
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <Button>
              Search
            </Button>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </Wrapper>
        </StyledForm>
        <Table>
          <thead>
            <TableRow>
              {
                ['Product name', 'Price', 'Category', 'Rating'].map((item) => (
                  <TableHeader key={item}>
                    {item}
                  </TableHeader>
                ))
              }
            </TableRow>
          </thead>
          <tbody>
            {!errorState && (
              currentPageData.map(({id,title,price, category, rating}) => (
              <TableRow key={id}>
                {Object.values({title,price, category, rating}).map(value =>
                  <TableCell>
                    {value}
                  </TableCell>
                )}
              </TableRow>
            )))}
          </tbody>
        </Table>
        {errorState && <p>{errorState}</p>}
      </Container>
    </>
  );
}

export default App;
