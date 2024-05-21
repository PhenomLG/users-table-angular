import { TApiClient } from "../../../api/api.types";

export type TClientTableRow = TApiClient & {
    id: string,
    isChecked: boolean
}
