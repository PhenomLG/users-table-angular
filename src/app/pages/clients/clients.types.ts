import { TApiClient } from "../../../api/api.types";

export type TClientTableRow = TApiClient & TBaseTableRow;

export type TBaseTableRow = {
    id: string,
    isChecked: boolean
}
