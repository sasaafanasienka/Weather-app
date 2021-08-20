import styled from 'styled-components'

const Button = styled.button`
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight: 700;
    height: 36px;
    min-width: 83px;
    background-color: rgba(0,0,0,0);
    border: 1px solid white;
    outline: none;
    cursor: pointer;
    color: white;
    margin: 0 10px 0 0;
    border-radius: 4px;
    transition: all .3s ease;
    box-sizing: border-box;
    &:last-of-type{
        margin: 0 0 0 0;
    }
    &:hover{
        background-color: rgba(255,255,255,1);
        color: black
    }
`

export default Button