export interface IListView {
    fetchData: any[];
    DeleteFunc?: (id: string) => void;
    canDelete: boolean;
}
