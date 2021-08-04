import styled from 'styled-components'

const DropdownMenuItem = styled.button`
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px;
    color: black;
    font-size: 14px;
    font-weight: 700;
    background-color: rgba(0,0,0,0);
    border-radius: 0;
    outline: none;
    border: none;
    text-align: left;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,.1)
    }
`

export default DropdownMenuItem
