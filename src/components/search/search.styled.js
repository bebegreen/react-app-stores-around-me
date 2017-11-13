import styled from 'styled-components'; 

export const SearchField = styled.form`
display: flex; 
align-items: center; 
margin: 3em; 
`; 
export const Input = styled.input`
border-bottom-left-radius: 5px;
border-top-left-radius: 5px;
font-size: 18px; 

width: 486px;
padding: 1em;
border: none;
margin-left: 1em;
&:focus { 
  outline: none; 
}
`; 
export const Submit = styled.button`
border-bottom-right-radius: 5px; 
border-top-right-radius: 5px; 
border: none;
cursor: pointer; 
transition: all 0.5s; 
color: inherit; 
width: 100px; 
height: 57px; 
&:hover {
  background:#504f4f;
  color: white;
}
&:focus { 
  outline: none; 
}
`;
export const Icon = styled.i`
font-size: 35px; 
`; 
