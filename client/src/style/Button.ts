import styled from "styled-components"
import { Button } from "antd"

const Update = styled(Button)`
    transform: rotate(45deg);
    font-size: 16px;

    &:hover {
        background: transparent;
        color: #1890ff;
    }
`

export default {
    Update,
}
