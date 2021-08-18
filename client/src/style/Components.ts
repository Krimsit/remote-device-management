import styled from "styled-components"

const Card = styled.div`
    border-radius: 5px;
    padding: 10px 30px;
    margin: 20px;
    border-top: 3px solid #1890ff;
    box-shadow: 0px 6px 10px hsl(230, 5%, 80%);
    transition: ease 0.3s all;
    min-height: 150px;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 0px 30px 40px -20px hsl(230, 5%, 65%);
    }
`

const ChartCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content-center;
    .title {
        text-align: center;
    }
    .content {
        text-align: center;
    }
    .legend{}
`

export default {
    Card,
    ChartCard,
}
