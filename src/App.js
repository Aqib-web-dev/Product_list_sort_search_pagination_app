import {useState, useEffect} from 'react';
import styled from 'styled-components';

const PAGELIMIT = 5
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

const StyledSelect = styled.select`
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  background-color: #4CAF50;
  color: #fff;
  cursor: pointer;
  margin: 18px;
`;

const StyledOption = styled.option`
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: #fff;
`;

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageData, setCurrentPageData] = useState([]);
  const [errorState, setErrorState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [paginatedData, setPaginatedData] = useState([]);

  const categories = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration' ];

  const loadProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const result = await response.json();
      setTotalPages(Math.ceil(result.products.length/PAGELIMIT));
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

  useEffect(() => {
    let start = (currentPage - 1) * PAGELIMIT;
    let end = start + PAGELIMIT;
    setPaginatedData(currentPageData.slice(start, end))
  }, [currentPage, data, currentPageData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery.length < 3) {
      setData([]);
      setErrorState('Search text should be at least 3 characters long'); 
      console.log('handle submit')
    }
    else {
      const results = data.filter((item) => {
        const title = item.title.toLowerCase();
        const query = searchQuery.toLowerCase();
        return title.includes(query);
      })
      if (results.length !== 0) {
        setPaginatedData(results.slice(0, PAGELIMIT))
        setCurrentPageData(results);
        setErrorState('');
        setTotalPages(Math.ceil(results.length / PAGELIMIT));
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

  const handleTableHeaderClick = (e) => {
    let headerText = e.target.textContent === 'Product name' ? 'title' : e.target.textContent.toLowerCase();
    const tempData = [...currentPageData];
    tempData.sort((a, b) => {
      const aValue = a[headerText].toString();
      const bValue = b[headerText].toString();
      return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
    });
    setCurrentPageData(tempData);
  };

  const handlePageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleCategoryChange = (e) => {
    let value = (e.target.value);
    setCurrentCategory(value);
    console.log(value);
    const filteredProducts = value === "All" ? data  : data.filter(product => product.category === value);
    setTotalPages(Math.ceil(filteredProducts.length / PAGELIMIT));
    setPaginatedData(filteredProducts.slice(0, PAGELIMIT));
    setCurrentPageData(filteredProducts);
  };

  return (
    <Container>
        <StyledForm onSubmit={handleSubmit}>
          <Wrapper>
            <StyledInput
              placeholder='Search product'
              value={searchQuery}
              onChange={handleSearchInput}
            />
            <Button type="submit"> Search </Button>
            <Button type="button" onClick={handleReset}> Reset</Button>
          </Wrapper>
        </StyledForm>
        <Table>
          <thead>
            <TableRow key={0}>
              {
                ['Product name', 'Price', 'Category', 'Rating'].map((item) => (
                  <TableHeader key={item} onClick={handleTableHeaderClick}>
                    {item}
                  </TableHeader>
                ))
              }
            </TableRow>
          </thead>
          <tbody>
            {!errorState && (
              paginatedData.map(({id,title,price, category, rating}) => (
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
        {!errorState && <Wrapper isMargin>
          {Array.from(Array(totalPages).keys()).map((pageNumber) => 
            <Button 
              onClick={() => handlePageNumber(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Button>
          )}
        </Wrapper>}

        <StyledSelect value={currentCategory} onChange={handleCategoryChange}>
          <StyledOption value='All'>
            All
          </StyledOption>
          {
            categories.map((category, index) => 
              <StyledOption key={index}>
                {category}
              </StyledOption>
            )
          }
        </StyledSelect>
    </Container>
  );
}

export default App;
