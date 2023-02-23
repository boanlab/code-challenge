import styled from "styled-components";
function ManagerPage({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  console.log(page)
  console.log(parseInt(page/10)*10,parseInt(page/10)*10+10)
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill().slice(parseInt(page/10)*10,parseInt(page/10)*10+10)
          .map((_, i) => (
            <Button
              key={i+1+ parseInt(page/10)*10}
              onClick={() => setPage(i+1+ parseInt(page/10)*10)}
              aria-current={page === i+1+ parseInt(page/10)*10 ? "page" : null}
            >
              {i + 1 + parseInt(page/10)*10}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;
const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #8c7ae6;
  color: white;
  font-size: 1rem;
  &:hover {
    background: navy;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }
  &[aria-current] {
    background: black;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
export default ManagerPage;
