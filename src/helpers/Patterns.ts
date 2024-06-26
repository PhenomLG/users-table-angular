export class Patterns {
    public static OnlyTextPattern(): string {
        return "^[A-Za-zА-Яа-я\\s\\ё]{1,64}$";
    }

    public static PhonePattern(): string {
        return "^((\\+7|7|8)+([0-9]){10})$";
    }
}
