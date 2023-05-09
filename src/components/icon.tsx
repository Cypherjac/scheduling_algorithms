import { cx, css } from '@emotion/css'

export default function Icon ({icon}:any) {
    return (
        <i className={cx(
                "material-icons",
                css`
                    font-size: 20px;
                `
            )
        }
        >{ icon }</i>
    )
}