export default class Todo {
    readonly id?: string;
    readonly userID?: string;
    readonly title: string;
    isCompleted: boolean;

    constructor(id: string, userID: string, title: string, isCompleted: boolean) {
        this.id = id;
        this.userID = userID;
        this.title = title;
        this.isCompleted = isCompleted;
    }
}
