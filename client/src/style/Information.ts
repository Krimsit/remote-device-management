import styled from "styled-components"

const Layout = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    text-align: center;
`

const Status = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    padding: 25px;
    text-align: center;
    .icon {
        font-size: 128px;
        color: #1890ff;
        margin-bottom: 15px;
    }
    .description {
        & > * {
            display: inline-block;
            vertical-align: middle;
        }
        .indicator {
            border-radius: 30px;
            margin-right: 10px;
            width: 10px;
            height: 10px;
            background: ${(props: { status: boolean }) => (props.status ? "#52C41A" : "#FF4D4F")};
        }
    }
`

const General = styled.div`
    background: #fff;
    text-align: center;
    .container {
        display: flex;
        & > * {
            margin: 15px;
        }
    }
`

export default {
    Layout,
    Status,
    General,
}
