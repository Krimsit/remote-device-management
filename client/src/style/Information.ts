import styled from "styled-components"

const Layout = styled.div`
    margin: 15px;
`

const Block = styled.div`
    position: relative;
    background: #fff;
    margin-bottom: 15px;
    height: 50%;
    .block__title {
        padding: 5px;
        text-align: center;
    }
    .block__container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    @media (max-width: 768px) {
        .block__container {
            flex-direction: column;
        }
    }
`

const Status = styled.div`
    width: 30%;
    padding: 25px;
    text-align: center;
    .icon {
        font-size: 128px;
        color: #1890ff;
        margin-bottom: 15px;
    }
    .description {
        .indicator {
            margin: 5px auto;
            border-radius: 30px;
            width: 10px;
            height: 10px;
            background: ${(props: { status: boolean }) => (props.status ? "#52C41A" : "#FF4D4F")};
        }
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

const StaticData = styled.div`
    width: 70%;
    .card__container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &__item {
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
        }

        &__btn {
            position: absolute;
            bottom: 5px;
            right: 5px;
        }
    }

    @media (max-width: 768px) {
        width: 100%;

        .card__container {
            &__item {
                width: 100%;
            }
        }
    }
`

export default {
    Layout,
    Block,
    Status,
    StaticData,
}
