import { MoreOutlined, InfoCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const ReturnIcon = (importance) => {
    let icon = "";
    let styleIcon = { fontSize: 20, cursor: 'pointer' };
    switch (importance) {
        case 1:
            icon = <InfoCircleOutlined style={{ ...styleIcon, color: "#1890ff" }} />
            break;
        case 3:
            icon = <WarningOutlined style={{ ...styleIcon, color: "#faad14" }} />
            break;
        case 5:
            icon = <CloseCircleOutlined style={{ ...styleIcon, color: "#ff4d4f" }} />
            break;
        default:
            icon = <MoreOutlined />;
    }
    return icon;
}